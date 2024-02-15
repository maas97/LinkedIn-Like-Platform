const AsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const { promisify } = require('util');
const bcrypt = require('bcryptjs')
const crypto = require("crypto");
const User = require('../../User');
const ApiError = require("../../../../Utils/ApiError");
const Email = require("../../../../Utils/emailSender.js");
// const xss = require('xss');
const District = require('../../../Locations/District/District.js')
const Category = require('../../../JobRelatedEntites/JobCategory/JobCategory.js')

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res, next) =>{
    const token = createToken(user.id);
    if(!token){
        return next(new ApiError('Error creating JWT token', 500))
    }
    res.status(statusCode).json({
        status: "success",
        data: { user, token }
    })
}

const createEmailVerificationToken = ()=>{
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const email_token = crypto.createHash("sha256")
                             .update(verificationToken)
                             .digest("hex");
    return [verificationToken, email_token];
}


const createVerifyToken = async (user, req, res, next)=>{

    const token = await createEmailVerificationToken(); // with the new function
    let Opt = crypto.randomBytes(4).toString("hex");

    const verifyUrl = `${ process.env.FRONTEND_URL || "http://localhost:8000" }/verify-email/${token[0]}`

    const email = new Email(user, verifyUrl, Opt);
    try{
        Opt = await bcrypt.hash(Opt, 10);
        await email.sendWelcome();

        user.password = await bcrypt.hash(user.password, 10);

        res.status(200).json({user: user, opt: Opt });
    } catch(err) {
        user.email_token = undefined;
        return next(new ApiError(
            "Failed to send email", 500
        ))
    }
}


const createLogoutToken = (statusCode, res, next)=>{
    const token = createToken(Date.now());
    if(!token){
        return next(new ApiError("Error creating JWT token", 500))
    }
    process.env.JWT_EXPIRES_IN = "30d";
    res.status(statusCode).json({
        status: "success",
        data: {token}
    })
}

const createHashedToken = function(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

exports.welcome = AsyncHandler(async (req, res, next)=>{
    res.status(200).json({
        status: "success",
        data:  "Welcome to Egy Recruitment API"
    })
})

exports.signup = AsyncHandler(async (req, res, next)=>{
    const newUser = req.body;
    // const sanitizedNewUwer = xss(newUser);

    const districtExists = await District.findById(req.body.districtId);
    const categoryExists = await Category.findById(req.body.categoryId);

    if (!districtExists) {
        return next(new ApiError("Please Enter a Valid District"));
    }
    if (!categoryExists) {
        return next(new ApiError("Please Enter a Valid Category"));
    }
    // console.log('sanitizedNewUwer')
    // console.log(sanitizedNewUwer)
    const createOPT = await createVerifyToken(newUser, req, res, next);
})  

exports.verifyUserAndSave = AsyncHandler (async (req, res, next)=>{
    const optAPI = req.body.optAPI;
    const optUser = req.body.optUser;
    const user = req.body.user; 

    const districtExists = await District.findById(req.body.user.districtId);
    const categoryExists = await Category.findById(req.body.user.categoryId);


    if (!districtExists) {
        return next(new ApiError("Please Enter a Valid District"));
    }
    if (!categoryExists) {
        return next(new ApiError("Please Enter a Valid Category"));
    }

    if(await bcrypt.compare(optUser, optAPI)){
        let newUser = await User.create(user);
        newUser.verified_at = Date.now();
        newUser.save({validateBeforeSave: false});
        createSendToken(newUser, 201, res, next);
    } else {
        return next(new ApiError(
            "You Entered wrong OPT, Please Enter The OTP Sent to Your Email", 400
        ))
    }
})

exports.login = AsyncHandler(async (req, res, next)=>{
    const {login, password} = req.body;

    const user = await User.findOne({email: login}).select("+password") || await User.findOne({phone: login}).select("+password");

    if(!user || !( await user.checkPassword(password, user.password) ) ){
        return next(new ApiError("Incorrect email or password", 401))
    }
    if(!user.is_active){
        return next(new ApiError("This Account is Not Active, Please Contact Us", 401))
    }

    const loggedUser = user.toJson();
    delete loggedUser.password;
    createSendToken(loggedUser, 200, res, next);
})

exports.protect = AsyncHandler( async(req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ApiError("Please Login First!", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id);

    if(!user){
        return next(new ApiError("User No Longer Exists!", 401));
    }

    // if(user.changedPasswordAfter(decoded.iat)){
    //     return next(new ApiError("Password Changed Recently, Login Again!", 401));
    // }

    if(!user.is_active){
        return next(new ApiError("This Account is not Active! Please Contact Us", 401));
    }

    req.user = user;
    next();
})

exports.forgotPassword = AsyncHandler(async (req, res, next) =>{
    const user = await User.findOne({email : req.body.forgotPassword}) || await User.findOne({phone : req.body.forgotPassword});

    if(!user){
        return next(new ApiError("No User Found with this email", 404))
    }
    const token = await user.createPasswordResetToken();

    await user.save({validateBeforeSave: false});

    const resetUrl = `http://localhost:8000/reset-password/${token}`; // put here the real url of our website that the user will update his forgetten password
    const email = new Email(user, resetUrl);

    try{
        await email.sendPasswordReset();
        res.status(200).json({
            status: "Success",
            message: "Please check your Email"
        })
    } 
    catch (err) {
        return next(new ApiError(
            err, 500
        ))
    }

})

exports.logout = AsyncHandler(async (req, res, next)=>{
    process.env.JWT_EXPIRES_IN= 120;
    createLogoutToken(200, res, next);
})


// exports.resetPassword = AsyncHandler(async (req, res, next)=>{
//     const hashedToken = createHashedToken(req.params.token);
//     const user = await User.findOne({
//         reset_password_token: hashedToken,
//         reset_password_token_expire: {$gt: Date.now() },
//     })
//     if(!user) {
//         return next(new ApiError(
//             "Token is invalid or has Expired", 400
//         ))
//     }
//     user.password = req.body.password;
//     user.confirmPassword = req.body.confirmPassword;
//     user.reset_password_token = undefined;
//     user.reset_password_token_expire = undefined;

//     await user.save();
//     createSendToken(user, 200, res, next);
// })


// exports.updatePassword = AsyncHandler(async (req, res, next)=>{
//     const user = await User.findById(req.user.id).select("+password");
//     if(!(await user.checkPassword(req.body.currentPassword, user.password))){
//         return next(new ApiError(
//             "Incorrect Password", 401
//         ))
//     }
//     user.password = req.body.password;
//     user.confirmPassword = req.body.confirmPassword;

//     await user.save();
//     createSendToken(user, 200, res, next);
// })
                                                           


// exports.verifyEmail = AsyncHandler(async (req, res, next)=>{ ///////// $$$$$$$$$$$$$$$$$$$$$ modify
//     const hashedToken = createHashedToken(req.params.token);
//     const user = await User.findOne({email_token: hashedToken});

//     if(!user) {
//         return next(new ApiError(
//             "Token is Invalid or has Expired !!", 400
//         ))
//     }
//     user.verified_at = Date.now();
//     user.email_token = undefined;
//     await user.save({validateBeforeSave: false});

//     createSendToken(user, 200, res, next);
// })

// exports.sendNewVerificationCode = AsyncHandler(async (req, res, next)=>{
//     let user = await User.findById(req.user.id);

//     if(user.verified_at) {
//         return next(new ApiError(
//             "This Email is Already Verified", 400
//         ))
//     }

//     user = await createVerifyToken(user, req, res, next);
//     createSendToken(user, 200, res, next)
// })