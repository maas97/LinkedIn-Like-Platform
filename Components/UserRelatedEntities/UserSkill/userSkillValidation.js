const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getUserSkillId = customJoi.object({
    id: customJoi.objectId().required()
})

const addUserSkill = customJoi.object.apply({
    userId: customJoi.objectId().required(),
    skillName: customJoi.string().required(),
})

const updateUserSkill = customJoi.object({
    // userId: customJoi.objectId().required(),
    skillName: customJoi.string().required(),
})

module.exports.validateUserSkillId = validateSchema(getUserSkillId, "params");
module.exports.validateAddUserSkill = validateSchema(addUserSkill);
module.exports.validateUpdateUserSkill = validateSchema(updateUserSkill);
