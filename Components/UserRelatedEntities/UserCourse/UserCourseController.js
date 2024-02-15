const AsyncHandler = require("express-async-handler");
const UserCourse = require('./UserCourse')
// const UserDistrict = require('../../Locations/District/District')
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserCourses = AsyncHandler(async (req, res, next)=>{

    const courses = await UserCourse.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: courses
    });
});

exports.getUserCourse = AsyncHandler(async (req, res, next)=>{

    const course = await UserCourse.findOne({userId: req.user.id, _id: req.params.id});

        if(!course){
            return next(new ApiError(
                "User Course not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: course
            }
        )
});


exports.addUserCourse = AsyncHandler(async (req, res, next)=>{


    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }


    let userCourse = await UserCourse.create({userId: req.user.id,
                                                      courseName: req.body.courseName,
                                                      place: req.body.place,
                                                      grade: req.body.grade,
                                                      fromDate: req.body.fromDate,
                                                      toDate: req.body.toDate
                                                    });
    
    await userCourse.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userCourse
    })
})


exports.updateUserCourse = AsyncHandler(async (req, res, next)=>{


    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }

    
        let userCourse = await UserCourse.findOneAndUpdate({_id: req.params.id}, 
                                                                    {userId: req.user.id,
                                                                        courseName: req.body.courseName,
                                                                        place: req.body.place,
                                                                        grade: req.body.grade,
                                                                        fromDate: req.body.fromDate,
                                                                        toDate: req.body.toDate
                                                                    },
                                                                    {new: true}
                                                                )

        if(!userCourse){
            return next(new ApiError(
                "User Course not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { userCourse }
        });
});

exports.deleteUserCourse = AsyncHandler(async (req, res, next)=>{

        const userCourse =await UserCourse.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!userCourse){
            return next(new ApiError(
                "User Course not Found", 404
            ))
        }

        res.status(400).json({
            status: "User Course Deleted Successfully",
            data: null
        })
})