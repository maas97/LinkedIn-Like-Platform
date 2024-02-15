const customJoi = require("../../../Utils/Validation");
const {validateSchema} = require("../../../Utils/Validation");

const updateProfile = customJoi.object({
    fullname: customJoi.string().optional().messages({
        "string.empty": "Fullname is required.",
    }),
    email: customJoi.string().optional().pattern(/^\S+@\S+\.\S+$/)
    .messages({
        "string.empty": "Email is required.",
        "string.pattern.base": "Please Enter a Valid Email Address"
    }),
    phone: customJoi.string().optional().pattern(/^\+?[1-9][0-9]{7,14}$/)
            .messages({
                "string.empty": "Phone Number is required.",
                "string.pattern.base": "Please Enter an International Phone Number that starts with phone number country code and total of 7 to 14 digits"
            }),
    password: customJoi.string().optional().min(8).pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,32}$/)
                .messages({
                    "string.empty": "Password is required.",
                    "string.pattern.base": "Please Enter a Password That contains at least all the following: One Uppercase Letter, One Lowercase Letter, One Digit And One Special Character like: !@#$%... "
                }),
    // userType: customJoi.string().required().pattern(/^\+?[1-2]{1,1}$/)
    //             .messages({
    //                 "string.empty": "UserType is required.",
    //                 "string.pattern.base": "User Type Can't be Anything but The Values: ('1' For Employee User), ('2' For Recruitment User) "
    //             }),
    image: customJoi.string().optional(),
    categoryId: customJoi.number().optional(),
    districtId: customJoi.objectId().optional()
});

module.exports.validateUpdateProfile = validateSchema(updateProfile);

