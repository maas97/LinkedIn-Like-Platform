const customJoi = require("../../Utils/Validation");
const {validateSchema} = require("../../Utils/Validation");


const getCompanyId = customJoi.object({
    id: customJoi.objectId().required()
})

const addCompany = customJoi.object.apply({
    // userId: customJoi.objectId().required(),
    companyName: customJoi.string().required(),
    phone: customJoi.string().required(),
    image: customJoi.string().optional(),
    address: customJoi.string().optional(),
    districtId: customJoi.objectId().required(),
    categoryId: customJoi.number().required(),
})

const updateCompany = customJoi.object({
    // userId: customJoi.objectId().required(),
    companyName: customJoi.string().optional(),
    phone: customJoi.string().optional(),
    image: customJoi.string().optional(),
    address: customJoi.string().optional(),
    districtId: customJoi.objectId().optional(),
    categoryId: customJoi.number().optional(),
})


module.exports.validateCompanyId = validateSchema(getCompanyId, "params");
module.exports.validateAddCompany = validateSchema(addCompany);
module.exports.validateUpdateCompany = validateSchema(updateCompany);
