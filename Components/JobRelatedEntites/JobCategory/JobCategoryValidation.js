const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const jobCategoryId = customJoi.object({
    id: customJoi.number().required()
})

const categoryName = customJoi.object({
    categoryName: customJoi.string().required().pattern(/^[a-zA-Z]+$/),
})

module.exports.validateJobCategoryId = validateSchema(jobCategoryId, "params");
module.exports.validateCategoryName = validateSchema(categoryName, "params");
