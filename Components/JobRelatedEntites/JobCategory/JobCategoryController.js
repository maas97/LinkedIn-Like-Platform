const AsyncHandler = require("express-async-handler");
const Category = require("./JobCategory");
const ApiError = require("../../../Utils/ApiError");

exports.getAllCategories = AsyncHandler(async (req, res, next)=>{
    const categories = await Category.find();
            
    res.status(200).json({
        status: "success",
        data: categories
    });
});


exports.getCategoryById = AsyncHandler (async ({params}, res, next)=>{

    const categoryId = params.id;
    const category = await Category.findById(categoryId);

    if(!category){
        return next(new ApiError(
            "No Category found, Enter a Valid Category Id", 404
        ))
    }

    res.status(200).json(
        {
            status: "success",
            data: category
        }
    )

} )

exports.getCategoryByName = AsyncHandler( async ({params}, res, next)=>{

    const categoryName = params.categoryName;
    const category = await Category.find(
                    { "categoryName": { "$regex": categoryName, "$options": "i" } }
                    );

    res.status(200).json(
        {
            status: "success",
            data: category
        }
    )
})



