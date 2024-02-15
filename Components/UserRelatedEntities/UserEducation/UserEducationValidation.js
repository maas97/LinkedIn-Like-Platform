const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getEducationId = customJoi.object({
    id: customJoi.objectId().required()
})

const addEducation = customJoi.object.apply({
    // userId: customJoi.objectId().required(),
    degree: customJoi.number().required(), // it will be dropdown menu list
    place: customJoi.string().required(),
    districtId: customJoi.objectId().optional(),
    grade: customJoi.string().required(),
    fromDate: customJoi.date().required(),
    toDate: customJoi.date().required(),
})

const updateEducation = customJoi.object({
    // userId: customJoi.objectId().required(),
    degree: customJoi.number().optional(), // it will be dropdown menu list
    place: customJoi.string().optional(),
    districtId: customJoi.objectId().optional(),
    grade: customJoi.string().optional(),
    fromDate: customJoi.date().optional(),
    toDate: customJoi.date().optional(),
})


module.exports.validateEducationId = validateSchema(getEducationId, "params");
module.exports.validateAddEducation = validateSchema(addEducation);
module.exports.validateUpdateEducation = validateSchema(updateEducation);
