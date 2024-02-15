const AsyncHandler = require("express-async-handler");
const User = require("../User");
const ApiError = require("../../../Utils/ApiError");
const District = require('../../Locations/District/District.js')
const Category = require('../../JobRelatedEntites/JobCategory/JobCategory.js')
const bcrypt = require('bcryptjs')

exports.getMyUser = AsyncHandler(async (req, res, next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: "success",
        data: user
    });
});

exports.updateMyUser = AsyncHandler(async (req, res, next)=>{

        const districtExists = await District.findById(req.body.districtId);

        const categoryExists = await Category.findById(req.body.categoryId);

        if (!districtExists) {
            return next(new ApiError("Please Enter a Valid District"));
        }
        if (!categoryExists) {
            return next(new ApiError("Please Enter a Valid Category"));
        }

        password = await bcrypt.hash(req.body.password, 10);


        const user = await User.findOneAndUpdate(
            {_id: req.user.id}, 
            {
                fullname: req.body.fullname,
                email: req.body.email,
                password: password,
                districtId: req.body.districtId,
                phone: req.body.phone,
                image: req.file.filename,
                categoryId: req.body.categoryId
            }, 
            {
                new: true,
            }
        )


        res.status(200).json({
            status: "Success",
            data: { user }
        });
});

exports.deactivateMyUser = AsyncHandler(async (req, res, next)=>{

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {   is_active: false  },
            {
                new: true,
                runValidators: true
            }
        )

        if(!user) {
            return next(new ApiError(
                "Something went wrong with deactivating this user", 400
            ))
        }

        res.status(200).json({
            status: "success",
            data: user
        })
})