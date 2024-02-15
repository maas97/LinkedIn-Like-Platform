const mongoose = require('mongoose');


const userExperienceSchema = new mongoose.Schema(
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
        company: {
            type: String,
            required: [true, "Please Enter Company's Name of This User's Experience"],
            trim: true
        },
        jobTitle: {
            type: String,
            required: [true, "Please Enter Job's Title of This User's Experience"],
            trim: true
        },
        comment: {
            type: String,
            // required: [true, "Please Enter Your City"],
            trim: true
        },
        fromDate: {
            type: Date,
            required: [true, "Please Enter Your Education Start Date"],
        },
        toDate: {
            type: Date,
            // required: [true, "Please Enter Your Governorate"],
        },
        companyId: { // optional just in case if the company no recruiter in the system entered it and we use it to suggest companies when user enter new experience
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Company",
            required: false,
        },
    }
)


const userExperience = mongoose.model("userExperience", userExperienceSchema)

module.exports = userExperience;