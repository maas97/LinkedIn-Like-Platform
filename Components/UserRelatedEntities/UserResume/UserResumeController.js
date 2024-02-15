const AsyncHandler = require("express-async-handler");
const UserResume = require('./UserResume')
const UserDistrict = require('../../Locations/District/District')
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserResumes = AsyncHandler(async (req, res, next)=>{

    const resumes = await UserResume.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: resumes
    });
});

exports.getUserResume = AsyncHandler(async (req, res, next)=>{

    const resume = await UserResume.findOne({userId: req.user.id, _id: req.params.id});

        if(!resume){
            return next(new ApiError(
                "User Resume not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: resume
            }
        )
});


exports.addUserResume = AsyncHandler(async (req, res, next)=>{

    let userResume = await UserResume.create({userId: req.user.id,
                                                      file: req.file.filename,
                                                      addingDate: req.body.addingDate,
                                                });
    
    await userResume.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userResume
    })
})


exports.updateUserResume = AsyncHandler(async (req, res, next)=>{

        let userResume = await UserResume.findOneAndUpdate({_id: req.params.id}, 
                                                                    {userId: req.user.id,
                                                                        file: req.file.filename,
                                                                        addingDate: req.body.addingDate,
                                                                    },
                                                                    {new: true}
                                                                )

        if(!userResume){
            return next(new ApiError(
                "User Resume not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { userResume }
        });
});

exports.deleteUserResume = AsyncHandler(async (req, res, next)=>{

        const userResume =await UserResume.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!userResume){
            return next(new ApiError(
                "User Resume not Found", 404
            ))
        }

        res.status(400).json({
            status: "Deleted Successfully",
            data: null
        })
})