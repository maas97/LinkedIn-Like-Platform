const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");


const countryId = customJoi.object({
    id: customJoi.objectId().required()
})

module.exports.validateCountryId = validateSchema(countryId, "params");
// module.exports.validateAddCountry = validateSchema(addCountry);
// module.exports.validateUpdateCountry = validateSchema(updateCountry);
