const mongoose = require('mongoose');


const userSkillSchema = new mongoose.Schema(
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
        skillName: {
            type: String,
            required: [true, "Please Enter Skill Name"],
            trim: true
        },
    }
)


const userSkill = mongoose.model("userSkill", userSkillSchema)

module.exports = userSkill;