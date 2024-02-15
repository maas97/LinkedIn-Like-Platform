const mongoose = require('mongoose');


const userEducationSchema = new mongoose.Schema(
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
        degree: {
            type: Number,
            required: [true, "Please Enter Your Education Degree"],
            trim: true
        },
        place: {
            type: String,
            required: [true, "Please Enter Your Education Place"],
            trim: true
        },
        districtId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "District",
            required: [true, "Please Enter Your Education District Place"],
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


const userEducation = mongoose.model("userEducation", userEducationSchema)

module.exports = userEducation;