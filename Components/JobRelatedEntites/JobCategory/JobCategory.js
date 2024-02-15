const mongoose = require('mongoose');


const jobCategorySchema = mongoose.Schema(
    {
        _id: {
            type: Number,
            auto: true,
        },
        categoryName: {
            type : String,
            required : [true,
                        "Category Name is Required Please"           
                       ],
            unique: [true, "This Category Already Exists"],
            trim: true   
        },
        mainCategoryId: {
            type: Number,
            // required: [true, "Main Category is Required"],
            default: 0 // 0 is for if the category is a mainCategory
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

jobCategorySchema.pre("update", function(next){
    this.updatedAt = Date.now();
    next();
})

jobCategorySchema.methods = {
    toJson() {
        return {
            _id: this._id.toHexString(),
            categoryName: this.categoryName,
            mainCategoryId: this.mainCategoryId,
            id: this._id.toHexString()
        }
    },
}


jobCategorySchema.statics = {
    async countCategories(){
        return await this.countDocuments();
    }
}

const jobCategory = mongoose.model("jobCategory", jobCategorySchema);

module.exports = jobCategory;