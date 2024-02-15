const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getJobSkillId = customJoi.object({
    id: customJoi.objectId().required()
})

const addJobSkill = customJoi.object.apply({
    jobId: customJoi.objectId().required(),
    skillName: customJoi.string().required(),
})

const updateJobSkill = customJoi.object({
    jobId: customJoi.objectId().required(),
    skillName: customJoi.string().required(),
})

module.exports.validateJobSkillId = validateSchema(getJobSkillId, "params");
module.exports.validateAddJobSkill = validateSchema(addJobSkill);
module.exports.validateUpdateJobSkill = validateSchema(updateJobSkill);
