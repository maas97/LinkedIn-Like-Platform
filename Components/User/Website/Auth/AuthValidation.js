const customJoi = require("../../../../Utils/Validation");
const {validateSchema} = require("../../../../Utils/Validation");

const register = customJoi.object({
    fullname: customJoi.string().required().messages({
        "string.empty": "Fullname is required.",
    }),
    email: customJoi.string().required().pattern(/^\S+@\S+\.\S+$/)
    .messages({
        "string.empty": "Email is required.",
        "string.pattern.base": "Please Enter a Valid Email Address"
    }),
    phone: customJoi.string().required().pattern(/^\+?[1-9][0-9]{7,14}$/)
            .messages({
                "string.empty": "Phone Number is required.",
                "string.pattern.base": "Please Enter an International Phone Number that starts with phone number country code and total of 7 to 14 digits"
            }),
    password: customJoi.string().required().min(8).pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,32}$/)
                .messages({
                    "string.empty": "Password is required.",
                    "string.pattern.base": "Please Enter a Password That contains at least all the following: One Uppercase Letter, One Lowercase Letter, One Digit And One Special Character like: !@#$%... "
                }),
    userType: customJoi.string().required().pattern(/^\+?[1-2]{1,1}$/)
                .messages({
                    "string.empty": "UserType is required.",
                    "string.pattern.base": "User Type Can't be Anything but The Values: ('1' For Employee User), ('2' For Recruitment User) "
                }),
    image: customJoi.string().optional(),
    categoryId: customJoi.number().required(),
    districtId: customJoi.objectId().required()
})


const login = customJoi.object({
    login: [
        customJoi.string().pattern(/^\S+@\S+\.\S+$/)
            .messages({
                "string.pattern.base": "Please Enter a Valid Email Address"
            }),
        customJoi.string().alphanum().pattern(/^\+?[1-9][0-9]{7,14}$/)
                .messages({
                    "string.pattern.base": "Please Enter an International Phone Number that starts with phone number country code and total of 7 to 14 digits"
                })
     ],
    password: customJoi.string().required().min(8).pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,32}$/)
    .messages({
        "string.empty": "Password is required.",
        "string.pattern.base": "Please Enter a Password That contains at least all the following: One Uppercase Letter, One Lowercase Letter, One Digit And One Special Character like: !@#$%... "
    })
})

const verifyUserAndSave = customJoi.object({
    optAPI: customJoi.string().required().min(8),
    optUser: customJoi.string().required().min(8), 
    user: customJoi.object({
                fullname: customJoi.string().required().messages({
                    "string.empty": "Fullname is required.",
                }),
                email: customJoi.string().required().pattern(/^\S+@\S+\.\S+$/)
                .messages({
                    "string.empty": "Email is required.",
                    "string.pattern.base": "Please Enter a Valid Email Address"
                }),
                phone: customJoi.string().required().pattern(/^\+?[1-9][0-9]{7,14}$/)
                        .messages({
                            "string.empty": "Phone Number is required.",
                            "string.pattern.base": "Please Enter an International Phone Number that starts with phone number country code and total of 7 to 14 digits"
                        }),
                password: customJoi.string().required().min(8).pattern(/^[a-zA-Z0-9\$\.\/]{60}$/)
                            .messages({
                                "string.empty": "Password is required.",
                                "string.pattern.base": "Bad Password Found"
                            }),
                userType: customJoi.string().required().pattern(/^\+?[1-2]{1,1}$/)
                            .messages({
                                "string.empty": "UserType is required.",
                                "string.pattern.base": "User Type Can't be Anything but The Values: ('1' For Employee User), ('2' For Recruitment User) "
                            }),
                image: customJoi.string().optional(),
                categoryId: customJoi.number().required(),
                districtId: customJoi.objectId().required()
    })
})

const forgotPassword = customJoi.object({
    forgotPassword: [
        customJoi.string().email(),
        customJoi.string().alphanum().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
     ]
})


const Token = customJoi.object({
    token: customJoi
      .string()
      .length(64)
      .pattern(/^[a-f0-9]+$/)
      .required(),
  });
  
module.exports.validateVerifyUserAndSave = validateSchema(verifyUserAndSave);
module.exports.validateRegister = validateSchema(register);
module.exports.validateLogin = validateSchema(login);
module.exports.validateForgotPassword = validateSchema(forgotPassword);
module.exports.validateToken = validateSchema(Token, "params");

