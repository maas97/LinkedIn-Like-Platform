const AsyncHandler = require("express-async-handler");

const User = require("../User");
const Location = require("../../Locations")
const ApiError = require("../../../Utils/ApiError");
const Factory = require("../../../Utils/Factory");

exports.getAllUsers = Factory.getAll(User);

exports.getUser = Factory.getOne(User);

exports.createUser = Factory.createOne(User);

exports.updateUser = Factory.updateOne(User);

exports.deleteUser = Factory.deleteOne(User, Location, "user_id");

exports.activateUser  = AsyncHandler( async(req, res, next)=>{

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {is_active: true},
        {
            new: true,
            runValidators: true
        }
    ).select("+is_active");

    if(!user){
        return next(new ApiError(`Something Went Wrong During Activating This User`, 400))
    }

    res.status(200).json({
        status: "Success",
        data: user
    })
})


exports.deActivateUser  = AsyncHandler( async(req, res, next)=>{
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {is_active: false},
        {
            new: true,
            runValidators: true
        }
    ).select("+is_active");

    if(!user){
        return next(new ApiError(`Something Went Wrong During Deactivating This User`, 400))
    }

    res.status(200).json({
        status: "Success",
        data: user
    })
})