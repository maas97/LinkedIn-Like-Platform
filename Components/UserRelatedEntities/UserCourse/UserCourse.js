const mongoose = require('mongoose');


const userCourseSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.ObjectId,
            auto: true
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: [true, "Please Enter User Id"],
        },
        courseName: {
            type: String,
            required: [true, "Please Enter Your Education Degree"],
            trim: true
        },
        place: {
            type: String,
            required: [true, "Please Enter Your Education Place"],
            trim: true
        },
        grade: {
            type: String,
            required: [true, "Please Enter Your Education Grade"],
            trim: true
        },
        fromDate: {
            type: Date,
            required: [true, "Please Enter Your Education Start Date"],
        }
        ,
        toDate: {
            type: Date,
            // required: [true, "Please Enter Your Governorate"],
        }
    }
)


const userCourse = mongoose.model("userCourse", userCourseSchema)

module.exports = userCourse;