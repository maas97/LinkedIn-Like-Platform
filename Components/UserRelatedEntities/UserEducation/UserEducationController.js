const AsyncHandler = require("express-async-handler");
const UserEducation = require('./UserEducation')
const UserDistrict = require('../../Locations/District/District')
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserEducations = AsyncHandler(async (req, res, next)=>{

    const educations = await UserEducation.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: educations
    });
});

exports.getUserEducation = AsyncHandler(async (req, res, next)=>{

    const education = await UserEducation.findOne({userId: req.user.id, _id: req.params.id});

        if(!education){
            return next(new ApiError(
                "User Education not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: education
            }
        )
});


exports.addUserEducation = AsyncHandler(async (req, res, next)=>{
    
    const isDistrict = await UserDistrict.findById(req.body.districtId);

    if(!isDistrict){ // to check if the companyId is found for consistency
        return next(new ApiError(
            "User District not Found, Please Enter a Valid District", 404
        ))
    }

    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }

    let userEducation = await UserEducation.create({userId: req.user.id,
                                                      degree: req.body.degree,
                                                      place: req.body.place,
                                                      districtId: req.body.districtId,
                                                      grade: req.body.grade,
                                                      fromDate: req.body.fromDate,
                                                      toDate: req.body.toDate
                                                    });
    
    await userEducation.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userEducation
    })
})


exports.updateUserEducation = AsyncHandler(async (req, res, next)=>{


    const isDistrict = await UserDistrict.findById(req.body.districtId);

    if(!isDistrict){ // to check if the companyId is found for consistency
        return next(new ApiError(
            "User District not Found, Please Enter a Valid District", 404
        ))
    }

    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }

        let userEducation = await UserEducation.findOneAndUpdate({_id: req.params.id}, 
                                                                    {userId: req.user.id,
                                                                        degree: req.body.degree,
                                                                        place: req.body.place,
                                                                        districtId: req.body.districtId,
                                                                        grade: req.body.grade,
                                                                        fromDate: req.body.fromDate,
                                                                        toDate: req.body.toDate
                                                                    },
                                                                    {new: true}
                                                                )

        if(!userEducation){
            return next(new ApiError(
                "User Education not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { userEducation }
        });
});

exports.deleteUserEducation = AsyncHandler(async (req, res, next)=>{

        const userEducation =await UserEducation.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!userEducation){
            return next(new ApiError(
                "User Education not Found", 404
            ))
        }

        res.status(400).json({
            status: "Deleted Successfully",
            data: null
        })
})