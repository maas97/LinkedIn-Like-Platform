const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const idValidator = require('mongoose-id-validator');

// const {District} = require('../Locations/District/District'); 
// const {Skill} = require('../UserRelatedEntities/UserSkill/userSkill'); 
// const {Education} = require('../UserRelatedEntities/UserEducation/UserEducation'); 
// const {Experience} = require('../UserRelatedEntities/UserExperience/userExperience'); 

// const userType = [{ id: 1, type: User },{id: 2, type: Company}]

const userSchema = mongoose.Schema(
    {
        fullname: {
            type : String,
            required : [true,
                        "Full Name is Required Please"           
                       ],
            trim: true   
        },
        email: {
            type: String,
            required: [true, "Email is Required Please"],
            unique: [true, "This Email Already Exists"],
            validate: {
                validator: function(value){
                    const emailRegex = /^\S+@\S+\.\S+$/;
                    return emailRegex.test(value);
                },
            message: "Please Enter a Valid Email",
            },
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone is Required"],
            unique: [true, "This Phone Already Exists"],
            validate: {
                validator: function(phone) {
                    const phoneRegex = /^\+?[1-9][0-9]{7,14}$/;
                    return phoneRegex.test(phone);
                },
                message: "Please Enter an International Phone Number that starts with phone number country code and total of 7 to 14 digits"
            },
        },
        password: {
            type: String,
            minlength: [8, "Password must be at least 8 characters long"],
            required: [true, "Please Enter Your Password"],
            validate: {
                validator: function(password) {
                    const passwordRegex = /^[a-zA-Z0-9\$\.\/]{60}$/;
                    return passwordRegex.test(password);
                },
                message: "Please Enter a Password That contains at least all the following: One Uppercase Letter, One Lowercase Letter, One Digit And One Special Character like: !@#$%... "
            },
            select: false
        },
        userType:{
            type: String,
            required: [true, "User Type is Required"],
            default: '1' // 1: for Employee, 2: for Recruiter
        },
        image: {
            type: String,
        },
        districtId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "District",
            required: [true, "User Must Have at least a District"],
        },
        categoryId: {
            type: Number,
            ref: "jobCategory",
            required: [true, "User Must Have at least One Job Category"],
        },
        is_active: {
            type: Boolean,
            default: true
        },
        last_login_date: {
            type: Date,
            default: undefined
        },
        verified_at: { // register_date
            type: Date,
            default: undefined
        },
        reset_password_token: {
            type: String,
            default: undefined
        },
        // skills: {
        //     type: [mongoose.SchemaTypes.Mixed],
        // },
        // educations: {
        //     type: [mongoose.SchemaTypes.Mixed],
        // },
        // experiences: {
        //     type: [mongoose.SchemaTypes.Mixed],
        // },
        // email_token: {
        //     type : String,
        //     default: undefined
        // },

        // confirmPassword: {
        //     type: String,
        //     required: [true, "Please Enter Your Confirm Password"],
        //     validate: {
        //         validator: function(confirm){
        //             return confirm === this.password;
        //         },
        //         message: "Password & Confirm Password Are Not The Same"
        //     }
        // },
         // userTypeId: {
        //     type: mongoose.SchemaTypes.ObjectId,
        //     ref: "Category",
        //     required: [true, "User Must Have at least J Category"],
        // },
        
        // skills / education / experience will be added here
        
        // reset_password_token_expire: {
        //     type: String,
        //     default: undefined
        // },
        // password_changed_at: {
        //     type: Date,
        //     default: undefined
        // },
    },
    {
        timestamps: true,
        toJson: {
            virtuals: true,
        },
        toObject: {
            virtuals:true
        }
    }
)
                                                   
userSchema.pre("update", function(next){
    this.updatedAt = Date.now();
    next();
})

       
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     // this.confirmPassword = undefined;
//     next();
//   }); // crypt the password
  
  userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
  }); // update Changed At password after reset success
  
// after the reset of the new password is successful, we can update the date of password changed
// userSchema.pre("save", function(next){
//     if(!isModified('password') || this.isNew)
//         return next();
//     this.password_changed_at = Date.now() - 1000;
//     next();
// })


userSchema.methods = {
    toJson() {
        return {
            _id: this._id.toHexString(),
            fullname: this.fullname,
            email: this.email,
            phone: this.phone,
            password: this.password,
            userType: this.userType,
            image: this.image,
            districtId: this.districtId,
            categoryId: this.categoryId,
            is_active: this.is_active,
            last_login_date: this.last_login_date,
            verified_at: this.verified_at,
            reset_password_token: this.reset_password_token,
            email_token: this.email_token,
            // reset_password_token_expire: this.reset_password_token_expire,
            // password_changed_at: this.password_changed_at,
            id: this._id.toHexString()

        }
    },
    checkPassword (candidatePassword, userPassword){
        // console.log("----------------------------")
        // console.log(typeof userPassword)
        // console.log(typeof candidatePassword)
        // console.log("%%%%%%%%%%%%%%%%%%%%")
        // console.log(bcrypt.compare(candidatePassword, userPassword))
        return bcrypt.compare(candidatePassword, userPassword);
    },
    createPasswordResetToken(){
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.reset_password_token = crypto.createHash("sha256")
                                          .update(resetToken)
                                          .digest("hex");
        this.reset_password_token_expire = Date.now() + 30 * 60 * 1000;
        return resetToken;
    },
    
    // changedPasswordAfter(JWTTimestamp){ // to check last date user changed his password
    //     if (this.password_changed_at){
    //         const changedTimestamp = parseInt(this.password_changed_at.getTime() / 1000 , 10);
    //         return JWTTimestamp < changedTimestamp
    //     }
    // },
}

                        
userSchema.statics = {
    async countUsers(){
        return await this.countDocuments();
    }
}

// userSchema.plugin(idValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;