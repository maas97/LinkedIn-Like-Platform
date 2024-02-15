const AsyncHandler = require("express-async-handler");
const UserExperience = require('./userExperience')
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserExperiences = AsyncHandler(async (req, res, next)=>{

    const experiences = await UserExperience.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: experiences
    });
});

exports.getUserExperience = AsyncHandler(async (req, res, next)=>{

    const experience = await UserExperience.findOne({userId: req.user.id, _id: req.params.id});

        if(!experience){
            return next(new ApiError(
                "Experience not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: experience
            }
        )
});


exports.addUserExperience = AsyncHandler(async (req, res, next)=>{


    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }

    let userExperience = await UserExperience.create({userId: req.user.id,
                                                      company: req.body.company,
                                                      jobTitle: req.body.jobTitle,
                                                      comment: req.body.comment,
                                                      fromDate: req.body.fromDate,
                                                      toDate: req.body.toDate,
                                                      companyId: req.body.companyId
                                                    });
    
    await userExperience.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userExperience
    })
})


exports.updateUserExperience = AsyncHandler(async (req, res, next)=>{

    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }


        let userExperience = await UserExperience.findOneAndUpdate({_id: req.params.id}, 
                                                                    {userId: req.user.id,
                                                                        company: req.body.company,
                                                                        jobTitle: req.body.jobTitle,
                                                                        comment: req.body.comment,
                                                                        fromDate: req.body.fromDate,
                                                                        toDate: req.body.toDate,
                                                                        companyId: req.body.companyId
                                                                    },
                                                                    {new: true}
                                                                    )

        if(!userExperience){
            return next(new ApiError(
                "Experience not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { userExperience }
        });
});

exports.deleteUserExperience = AsyncHandler(async (req, res, next)=>{

        const userExperience =await UserExperience.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!userExperience){
            return next(new ApiError(
                "Experience not Found", 404
            ))
        }

        res.status(400).json({
            status: "Deleted Successfully",
            data: null
        })
})