const AsyncHandler = require("express-async-handler");
const {del} = require("express/lib/application");

const ApiError = require("./ApiError");

const ApiFeatures = require("./ApiFeatures");
const { query } = require("express");

module.exports.getAll = (Model) => {
    AsyncHandler(async ({body, query, lang}, res, next)=>{

        let filter = {};

        if(body.filterObject)
            filter = body.filterObject;


        const apiFeatures = new ApiFeatures(query, Model.find(filter));

        apiFeatures.filter().sort().limitFields().search();

        const [documentCount, documents] = await Promise.all([
            Model.countDocuments(apiFeatures.mongooseQuery.getQuery()),
            apiFeatures.paginate(0).mongooseQuery
        ]);

        const { paginationResult : pagination } = new ApiFeatures( query, Model.find(filter)).paginate(documentCount);


        res.status(200).json(
            {
                result: documents.length,
                pagination,
                data: documents,
            }
        );
    });


    module.exports.getOne = (model) =>{
        AsyncHandler(async ({params, opts}, res, next )=>{
            const {id} = params;
            console.log(opts);

            const query = Model.findOne({ _id: id, ...opts});
            const  document = await query;

            if(!document)
                return next(new ApiError(`No ${Model.modelName} for this id ${id}`, 404))

            res.status(200).json({
                status: "success",
                data: document
            });
        })
    }    
}

module.exports.getOneBySlug = (Model) => AsyncHandler(async ({params, lang}, res, next)=>{
    const { slug } = params;
    const query = Model.findOne({slug: slug});

    const document = await query;
    if(!document)
        return next(new ApiError(
                `No ${Model.modelName} for this slug ${slug}`, 404))
            
        res.status(200).json({
            status: "success",
            data: document
        })
})

module.exports.createOne = (Model) =>{
    AsyncHandler(async ({body}, res, next)=>{

        const document = await Model.create(body);

        if(!document)
            return next(new ApiError(
        `Bad request`, 400));

        res.status(201).json({
            status: "Success",
            data: document.toJson()
        })
    })
}


module.exports.updateOne = (Model) => AsyncHandler(async ({body, params}, res, next)=>{
    const { id } = params;

    const document = await Model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        skipInvalidation: true
    })

    if(!document)
        return next(new ApiError(`No ${Model.modelName} for this id ${id}`, 404))

        document.save({validateBeforeSave: false})

        res.status(200).json({
            status: "Success",
            data: document
        })
})

module.exports.deleteOne = (Model, subModel, conditionKey)=> {
    AsyncHandler(async ({params}, res, next)=>{

        const {id} = params;
        if(subModel && conditionKey) {
            const condition = await subModel.find({[conditionKey] : id});
        
            if(condition.length > 0 ) {
                return next(new ApiError (
                    `Cannot delete ${Model.modelName} with ${subModel.modelName}`, 400
                ))
            }
        }

        const document = await Model.findByIdAndUpdate(id);

        if(!document)
            return next(new ApiError(
                `No ${Model.modelName} for this id ${id}`, 404
                ))
        
        document.remove();
        res.status(204).json({
            status: "Success",
            data: null
        })
    })
}



module.exports.ban = (Model)=>{
    AsyncHandler(async ({params, user}, res, next )=>{

        const {id} = params;

        if(id === user._id)
            return next(new ApiError(`You can't ban yourself`, 400));
        
        const document = await Model.findByIdAndUpdate(id, {is_banned: true}, {new: true}).exec();

        if(!document)
            return next(new ApiError(`No $Model.modelName for this id ${id}`, 400))


        res.status(200).json({
            status: "Success",
            data: document
        })
    })
}


module.exports.unban = (Model) => {
    AsyncHandler(async ({params, user}, res, next)=>{

        const {id} = params;

        if(id === user._id)
            return next(ApiError(`You can't unban yourself`, 400))
    
        const document = await Model.findByIdAndUpdate(
            id,
            {is_baned: false},
            {new: true}
        ).exec();


        if(!document)
            return next(new ApiError(`No ${Model.modelName} for this id ${id}`, 404))

        res.status(200).json({
            status: "Success",
            data: document
        })
    })
}


module.exports.activate = (Model)=> {
        async ({params}, res, next)=>{

            const {id} = params;

            const document = await Model.findByIdAndUpdate(
                id,
                {
                    is_active: true
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if(!document)
                return next(new ApiError(`Activation went wrong`, 400))

            res.status(200).json({
                sataus: "Success",
                data: document
            })
        }
}

module.exports.deactivate = (Model)=>{
    AsyncHandler(async ({params}, res, next)=>{

        const {id} = params;

        const document = await Model.findByIdAndUpdate(
            id,
            {is_active: false},
            {new: true,
            runValidators:true
        }
        );

        if(!document)
            return next(new ApiError(`Deactivate went wrong`, 400));

        res.status(200).json({
            status: "Success",
            data: document
        })
    })
};
