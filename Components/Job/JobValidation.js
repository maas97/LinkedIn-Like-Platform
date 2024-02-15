const customJoi = require("../../Utils/Validation");
const {validateSchema} = require("../../Utils/Validation");


const getJobId = customJoi.object({
    jobId: customJoi.objectId().required()
})

const getJobByCompanyId = customJoi.object({
    companyId: customJoi.objectId().required()
})

const addJob = customJoi.object.apply({
    companyId: customJoi.objectId().required(),
    title: customJoi.string().required(),
    description: customJoi.string().required(),
    openDate: customJoi.date().required(),
    closeDate: customJoi.date().required(),
    jobType: customJoi.string().required().pattern(/^\+?[1-3]{1,1}$/)
                .messages({
                    "string.empty": "Job Type is required.",
                    "string.pattern.base": "Job Type Can't be Anything but The Values: ('1' For Onsite Job), ('2' For Remote Job), ('3' For Hybrid Job) "
                }),
    categoryId: customJoi.number().required(),
})

const updateJob = customJoi.object({
    companyId: customJoi.objectId().required(),
    title: customJoi.string().optional(),
    description: customJoi.string().optional(),
    openDate: customJoi.date().optional(),
    closeDate: customJoi.date().optional(),
    jobType: customJoi.number().optional(),
    categoryId: customJoi.number().optional(),
})


module.exports.validateJobId = validateSchema(getJobId, "params");
module.exports.validateJobByCompanyId = validateSchema(getJobByCompanyId, "params");
module.exports.validateAddJob = validateSchema(addJob);
module.exports.validateUpdateJob = validateSchema(updateJob);
