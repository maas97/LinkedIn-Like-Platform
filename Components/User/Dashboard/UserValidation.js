const customJoi = require("../../../Utils/Validation");

const { validationSchema } = require("../../../Utils/Validation");

const userID = customJoi.object({
    id: customJoi.objectId().required()
});

const createUser = customJoi.object({
    fullname: customJoi.string().required(),
    email: customJoi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "net"]}
    }).required().trim(),
    password: customJoi.string().required().min(8),
    confirmPassword: customJoi.ref("password"),
    phone: customJoi.string().required().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    // Image: customJoi.string().required(),
    location:customJoi.object().keys({
        area: customJoi.string().optional().trim(),
        city: customJoi.string().required().trim(),
        governorate: customJoi.string().required().trim(),
        country: customJoi.string().required().trim(),
    }
    ).min(1).required(),
});

const updateUser = customJoi.object({
    fullname: customJoi.string().required(),
    email: customJoi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "net"]}
    }).required().trim(),
    password: customJoi.string().required().min(8),
    confirmPassword: customJoi.ref("password"),
    phone: customJoi.string().required().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    // Image: customJoi.string().required(),
});

module.exports.validateUserId = validationSchema(userID, "params");
module.exports.validateCreateUser = validationSchema(createUser);
module.exports.validateUpdateUser = validationSchema(updateUser);