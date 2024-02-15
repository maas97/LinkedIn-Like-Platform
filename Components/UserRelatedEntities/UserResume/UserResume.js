const mongoose = require('mongoose');


const userResumeSchema = new mongoose.Schema(
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
        file: {
            type: String,
            // required: [true, "Please Upload the Resume File"],
        },
        addingDate: {
            type: Date,
            default: Date.now(),
        },
    }
)


const userResume = mongoose.model("userResume", userResumeSchema)

module.exports = userResume;