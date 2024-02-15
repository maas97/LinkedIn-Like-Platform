const mongoose = require('mongoose');


const jobSkillSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.ObjectId,
            auto: true
        },
        jobId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Job",
            required: [true, "Please Enter Job Id"],
        },
        skillName: {
            type: String,
            required: [true, "Please Enter Job's Skill Name"],
            trim: true
        },
    }
)


const jobSkill = mongoose.model("jobSkill", jobSkillSchema)

module.exports = jobSkill;