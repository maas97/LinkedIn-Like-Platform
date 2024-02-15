const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const getCourseId = customJoi.object({
    id: customJoi.objectId().required()
})

const addCourse = customJoi.object.apply({
    // userId: customJoi.objectId().required(),
    courseName: customJoi.string().required(),
    place: customJoi.string().required(),
    grade: customJoi.string().required(),
    fromDate: customJoi.date().required(),
    toDate: customJoi.date().required(),
})

const updateCourse = customJoi.object({
    // userId: customJoi.objectId().required(),
    courseName: customJoi.string().optional(),
    place: customJoi.string().optional(),
    grade: customJoi.string().optional(),
    fromDate: customJoi.date().optional(),
    toDate: customJoi.date().optional(),
})


module.exports.validateCourseId = validateSchema(getCourseId, "params");
module.exports.validateAddCourse = validateSchema(addCourse);
module.exports.validateUpdateCourse = validateSchema(updateCourse);
