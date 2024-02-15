const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getUserResumeId = customJoi.object({
    id: customJoi.objectId().required()
})

const addUserResume = customJoi.object.apply({
    // userId: customJoi.objectId().required(),
    file: customJoi.string().required(),
    addingDate: customJoi.date().required(),
})

const updateUserResume = customJoi.object({
    // userId: customJoi.objectId().required(),
    file: customJoi.string().required(),
    addingDate: customJoi.date().required(),
})

module.exports.validateResumeId = validateSchema(getUserResumeId, "params");
module.exports.validateAddResume = validateSchema(addUserResume);
module.exports.validateUpdateResume = validateSchema(updateUserResume);
