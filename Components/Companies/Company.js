const mongoose = require('mongoose');
const {District} = require('../Locations/District/District'); 


const companySchema = mongoose.Schema(
    {
        companyName: {
            type : String,
            required : [true,
                        "Company Name is Required Please"           
                       ],
            unique: [true, "This Company Already Exists"],
            trim: true   
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: [true, "Recruiter is Required Please"],
            // unique: [true, "This Recruiter Already Exists"],
        },
        image: {
            type: String,
        },
        districtId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "District",
            required: [true, "Company Must Have at least a District"],
        },
        phone: {
            type: String,
            required: [true, "Phone Number is Required"],
            unique: [true, "This Phone Already Exists"],
            validate: {
                validator: function(phone) {
                    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                    return phoneRegex.test(phone);
                },
                message: "Please Enter a Valid Phone Number"
            },
        },   
        address: {
            type: String,
        },
        categoryId: {
            type: Number,
            ref: "Category",
            required: [true, "Company Must Have at least a Job Category"],
        },
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

companySchema.pre("update", function(next){
    this.updatedAt = Date.now();
    next();
})

companySchema.methods = {
    toJson() {
        return {
            _id: this._id.toHexString(),
            companyName: this.companyName,
            userId: this.userId,
            phone: this.phone,
            districtId: this.districtId,
            categoryId: this.categoryId,
            image: this.image,
            address: this.address,
            id: this._id.toHexString()

        }
    },
}


companySchema.statics = {
    async countCompanies(){
        return await this.countDocuments();
    }
}

const Company = mongoose.model("Company", companySchema);

module.exports = Company;