const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getJobApplicantId = customJoi.object({
    id: customJoi.objectId().required()
})

const addJobApplicant = customJoi.object.apply({
    // userId: customJoi.objectId().required(),
    jobId: customJoi.objectId().required(),
    // applicationDate: customJoi.date().optional(),
})

// const updateJobApplicant = customJoi.object({
//     userId: customJoi.objectId().required(),
//     jobId: customJoi.objectId().required(),
//     applicationDate: customJoi.date().optional(),
// })

module.exports.validateJobApplicantId = validateSchema(getJobApplicantId, "params");
module.exports.validateAddJobApplicant = validateSchema(addJobApplicant);
// module.exports.validateUpdateJobApplicant = validateSchema(updateJobApplicant);
