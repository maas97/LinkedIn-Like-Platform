const AsyncHandler = require("express-async-handler");
const JobApplication = require('./JobApplicant')
const Company = require('../../Companies/Company')
// const Category = require('../../JobRelatedEntites/JobCategory/JobCategory')
const Job = require("../../Job/Job")
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserJobApplications = AsyncHandler(async (req, res, next)=>{

    const userJobApplications = await JobApplication.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: userJobApplications
    });
});


exports.getAllCompanyJobApplications = AsyncHandler(async (req, res, next)=>{

    const company = await Company.find({userId: req.user.id});
    if(!company){ 
        return next(new ApiError(
            "This Recruiter doesn't have any Companies", 400
        ))
    }

    const isCompany = await Company.find({companyId: req.params.companyId});
    if(!isCompany){ 
        return next(new ApiError(
            "Company Not Found", 400
        ))
    }

    const job = await Job.find({companyId: company.id}).select("+id");


    
    const companyJobsIdArray = job.map(obj => obj.id);


    const companyJobApplications = await JobApplication.find({jobId: companyJobsIdArray});

    res.status(200).json({
        status: "success",
        data: companyJobApplications
    });
});


exports.getOneUserJobApplication = AsyncHandler(async (req, res, next)=>{

    const companyJobApplication = await JobApplication.findOne({userId: req.user.id, _id: req.params.id});

        if(!companyJobApplication){
            return next(new ApiError(
                "Job Application not Found for This User", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: companyJobApplication
            }
        )
});


exports.getOneCompanyJobApplication = AsyncHandler(async (req, res, next)=>{

    const company = await Company.find({userId: req.user.id});
    if(!company){ 
        return next(new ApiError(
            "This Recruiter doesn't have any Companies", 400
        ))
    }

    const isCompany = await Company.find({companyId: req.params.companyId});
    if(!isCompany){ 
        return next(new ApiError(
            "Company Not Found", 400
        ))
    }

    const companyJobApplication = await Job.findOne({companyId: req.params.companyId, _id: req.params.id});

        if(!companyJobApplication){
            return next(new ApiError(
                "Job not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: companyJobApplication
            }
        )
});


exports.addUserJobApplication = AsyncHandler(async (req, res, next)=>{


    let userJobApplication = await JobApplication.create({userId: req.user.id,
                                               jobId: req.body.jobId,
                                    });
    
    await userJobApplication.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userJobApplication
    })
})


// exports.updateCompanyJob = AsyncHandler(async (req, res, next)=>{

//     const company = await Company.find({id: req.body.companyId});
//     if(!company){ 
//         return next(new ApiError(
//             "Company not Found", 400
//         ))
//     }

//     const category = await Category.find({id: req.body.categoryId});
//     if(!category){ 
//         return next(new ApiError(
//             "Category not Found", 400
//         ))
//     }

//     const userCompanies = await Company.find({userId: req.user.id}).select('userId');

//     const exists = userCompanies[0].userId == req.user.id;

//         if(!exists)
//         {
//             return next(new ApiError(
//                 "The Company Doesn't Belong to This Recruiter", 400
//             ))

//         }

//         let companyJob = await Job.findOneAndUpdate({_id: req.params.id}, 
//                                                         {userId: req.user.id,
//                                                             title: req.body.title,
//                                                             description: req.body.description,
//                                                             openDate: req.body.openDate,
//                                                             closeDate: req.body.closeDate,
//                                                             jobType: req.body.jobType,
//                                                             categoryId: req.body.categoryId,
//                                                             companyId: req.body.companyId
//                                                         },
//                                                         {new: true}
//                                                         )

//         if(!companyJob){
//             return next(new ApiError(
//                 "Job not Found", 404
//             ))
//         }
//         res.status(200).json({
//             status: "Success",
//             data: { companyJob }
//         });
// });


// exports.deleteCompanyJob = AsyncHandler(async (req, res, next)=>{

//         const userCompanies = await Company.find({userId: req.user.id}).select('userId');

//         const exists = userCompanies[0].userId == req.user.id;

//             if(!exists)
//             {
//                 return next(new ApiError(
//                     "The Company Doesn't Belong to This Recruiter", 400
//                 ))

//             }

//         const companyJob =await Job.findOneAndDelete({_id: req.params.id});

//         if(!companyJob){
//             return next(new ApiError(
//                 "Job not Found", 404
//             ))
//         }

//         res.status(400).json({
//             status: "Job Deleted Successfully",
//             data: null
//         })
// })