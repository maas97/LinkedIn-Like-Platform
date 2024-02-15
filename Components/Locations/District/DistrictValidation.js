const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const districtId = customJoi.object({
    id: customJoi.objectId().required()
})

const countryName = customJoi.object({
    countryName: customJoi.string().required().pattern(/^[a-zA-Z]+$/),
})

module.exports.validateDistrictId = validateSchema(districtId, "params");
module.exports.validateDistrictCountryName = validateSchema(countryName, "params");
// module.exports.validateAddCountry = validateSchema(addCountry);
// module.exports.validateUpdateCountry = validateSchema(updateCountry);
