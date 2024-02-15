const mongoose = require('mongoose');


const jobApplicantSchema = new mongoose.Schema(
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
        jobId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Job",
            required: [true, "Please Enter Job Id"],
        },
        applicationDate: {
            type: Date,
            default: Date.now(),
        },
    }
)


const jobApplicant = mongoose.model("jobApplicant", jobApplicantSchema)

module.exports = jobApplicant;