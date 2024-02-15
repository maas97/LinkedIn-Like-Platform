const mongoose = require('mongoose');
const {District} = require('../Locations/District/District'); 


const jobSchema = mongoose.Schema(
    {
        companyId: {
            type : mongoose.SchemaTypes.ObjectId,
            required : [true,
                        "Company Id is Required Please"           
                       ],
            ref: "Company",
        },
        title: {
            type: String,
            required: [true, "Job Title is Required"],
        },   
        description: {
            type: String,
        },
        openDate: {
            type: Date,
            required: [true, "Job Must Have an Open Date"],
        },
        closeDate: {
            type: Date,
            required: [true, "Job Must Have a Close Date"],
        },
        categoryId: {
            type: Number,
            ref: "Category",
            required: [true, "Job Must Have a Job Category"],
        },
        jobType: { // onsite: 1, remote: 2, hybrid: 3      
            type: String,
            required: [true, "Job Must Have a Job Type"],
            validate: {
                validator: function(jobType) {
                    const jobTypeRegex = /^\+?[1-3]{1,1}$/;
                    return jobTypeRegex.test(jobType);
                },
                message: "Job Type Can't be Anything but The Values: ('1' For Onsite Job), ('2' For Remote Job), ('3' For Hybrid Job)"
            },
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

jobSchema.pre("update", function(next){
    this.updatedAt = Date.now();
    next();
})

jobSchema.methods = {
    toJson() {
        return {
            _id: this._id.toHexString(),
            fullname: this.fullname,
            email: this.email,
            phone: this.phone,
            districtId: this.districtId,
            categoryId: this.categoryId,
            image: this.image,
            address: TouchList.address,
            id: this._id.toHexString()
        }
    },
}


jobSchema.statics = {
    async countJobs(){
        return await this.countDocuments();
    }
}

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;