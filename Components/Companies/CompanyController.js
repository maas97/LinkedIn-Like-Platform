const AsyncHandler = require("express-async-handler");
const Company = require('./Company')
const User = require('../User/User')
const District = require('../Locations/District/District')
const ApiError = require("../../Utils/ApiError");

exports.getAllCompanies = AsyncHandler(async (req, res, next)=>{

    const companies = await Company.find();

    res.status(200).json({
        status: "success",
        data: companies
    });
});

exports.getCompany = AsyncHandler(async (req, res, next)=>{

    const company = await Company.findOne({_id: req.params.id});

        if(!company){
            return next(new ApiError(
                "Company not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: company
            }
        )
});

exports.getCompaniesOfSpecificRecruiter = AsyncHandler(async (req, res, next)=>{

    const company = await Company.find({userId: req.params.userId});

        if(!company){
            return next(new ApiError(
                "This Recruiter Doesn't Have Any Companies Yet", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: company
            }
        )
});


exports.addUserCompany = AsyncHandler(async (req, res, next)=>{

    const isRecruiter = await User.findById(req.user.id);
    const isDistrict = await District.findById(req.body.districtId)

    if(isRecruiter.userType == 1){ // to check if the account type is recruiter
        return next(new ApiError(
            "Only Recruiter Type Accounts are Allowed to Create New Companies", 400
        ))
    }

    if(!isDistrict){ // to check if the account type is recruiter
        return next(new ApiError(
            "District not Found", 400
        ))
    }

    let company = await Company.create({userId: req.user.id,
                                                      companyName: req.body.companyName,
                                                      image: req.file.filename,
                                                      districtId: req.body.districtId,
                                                      phone: req.body.phone,
                                                      address: req.body.address,
                                                      categoryId: req.body.categoryId
                                                    });
    
    await company.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: company
    })
})


exports.updateUserCompany = AsyncHandler(async (req, res, next)=>{

        const isRecruiter = await User.findById(req.user.id);
        const isDistrict = await District.findById(req.body.districtId)

        if(isRecruiter.userType == 1){ // to check if the account type is recruiter
            return next(new ApiError(
                "Only Recruiter Type Accounts are Allowed to Update Existing Companies", 400
            ))
        }

        if(!isDistrict){ // to check if the account type is recruiter
            return next(new ApiError(
                "District not Found", 400
            ))
        }
           
            let myCompany = await Company.findOneAndUpdate({_id: req.params.id, userId:req.user.id }, 
                    {userId: req.user.id,
                        companyName: req.body.companyName,
                        image: req.file.filename,
                        districtId: req.body.districtId,
                        phone: req.body.phone,
                        address: req.body.address,
                        categoryId: req.body.categoryId
                    },
                    {new: true}
                )

            if(!myCompany){
                return next(new ApiError(
                "UNAUTHORIZED, This Company Doesn't Belong to the Logged-In Recruiter", 401
                ))
            }
            res.status(200).json({
                status: "Success",
                data: { myCompany }
            });

});

exports.deleteUserCompany = AsyncHandler(async (req, res, next)=>{

        const company =await Company.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!company){
            return next(new ApiError(
                "Company not Found For This User", 404
            ))
        }

        res.status(400).json({
            status: "Company Deleted Successfully",
            data: null
        })
})

