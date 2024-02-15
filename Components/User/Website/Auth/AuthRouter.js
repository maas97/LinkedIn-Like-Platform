const express = require("express");
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });

const {
    forgotPassword,
    logout,
    protect,
    welcome,
    // updatePassword,
    // resetPassword,
    login,
    signup,
    verifyUserAndSave,
    // verifyEmail,
    // sendNewVerificationCode
} = require("./AuthController")

// const upload = require("")

const { 
    validateRegister,
    validateLogin,
    validateForgotPassword,
    validateVerifyUserAndSave,
    // validateResetPassword,
    validateToken
} = require("./AuthValidation")

const router = express.Router();

// const assignImage = 


router.get("/", welcome);

router.post("/register", validateRegister, signup);

router.post("/login", validateLogin, login);

router.post("/forgot-password", validateForgotPassword, forgotPassword); //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ modify it

router.post("/verify-user", validateVerifyUserAndSave, verifyUserAndSave); //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ modify it

router.delete("/logout", protect, logout);

// router.patch("/reset-password/:token", validateToken, validateResetPassword, resetPassword );
                                                                     
// router.post("/resend-verification-code", protect, sendNewVerificationCode);

// router.patch("/update-password", protect, updatePassword);


module.exports = router;





