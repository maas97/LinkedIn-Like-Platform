const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getExperienceId = customJoi.object({
    id: customJoi.objectId().required()
})

const addExperience = customJoi.object.apply({
    userId: customJoi.objectId().required(),
    company: customJoi.string().required(),
    jobTitle: customJoi.string().required(),
    comment: customJoi.string().optional(),
    companyId: customJoi.objectId().optional(),
    fromDate: customJoi.date().required(),
    toDate: customJoi.date().required(),
})

const updateExperience = customJoi.object({
    // userId: customJoi.objectId().required(),
    company: customJoi.string().optional(),
    jobTitle: customJoi.string().optional(),
    comment: customJoi.string().optional(),
    companyId: customJoi.objectId().optional(),
    fromDate: customJoi.date().optional(),
    toDate: customJoi.date().optional(),
})


module.exports.validateExperienceId = validateSchema(getExperienceId, "params");
module.exports.validateAddExperience = validateSchema(addExperience);
module.exports.validateUpdateExperience = validateSchema(updateExperience);
