const AsyncHandler = require("express-async-handler");
const Job = require('./Job')
const Company = require('../Companies/Company')
const Category = require('../JobRelatedEntites/JobCategory/JobCategory')
const ApiError = require("../../Utils/ApiError");

exports.getAllJobs = AsyncHandler(async (req, res, next)=>{

    const companyJob = await Job.find();

    res.status(200).json({
        status: "success",
        data: companyJob
    });
});


exports.getAllSpecificCompanyJobs = AsyncHandler(async (req, res, next)=>{

    const companyJob = await Job.find({companyId: req.params.companyId});

    res.status(200).json({
        status: "success",
        data: companyJob
    });
});

exports.getSpecificJob = AsyncHandler(async (req, res, next)=>{

    // const company = await Company.find({userId: req.user.id});
    // console.log(company)
    // if(!company){ 
    //     return next(new ApiError(
    //         "This Recruiter doesn't have any Companies", 400
    //     ))
    // }

    // const isCompany = await Company.find({companyId: req.body.companyId});
    // if(!isCompany){ 
    //     return next(new ApiError(
    //         "Company Not Found", 400
    //     ))
    // }

    const companyJob = await Job.findOne({ _id: req.params.jobId});

        if(!companyJob){
            return next(new ApiError(
                "Job not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: companyJob
            }
        )
});


exports.addCompanyJob = AsyncHandler(async (req, res, next)=>{

    const company = await Company.find({_id: req.body.companyId, userId: req.user.id});
    console.log('company///////////////')
    console.log(req.body.companyId)
    console.log(req.user.id)
    console.log(company)

    if(!company || company.length == 0){ 
        return next(new ApiError(
            "Company not Found For This Recruiter", 400
        ))
    }

    const category = await Category.find({id: req.body.categoryId});
    if(!category){ 
        return next(new ApiError(
            "Category not Found", 400
        ))
    }

    const userCompanies = await Company.find({userId: req.user.id}).select('userId');

    const exists = userCompanies[0].userId == req.user.id;

        if(!exists)
        {
            return next(new ApiError(
                "The Company Doesn't Belong to This Recruiter", 400
            ))

        }

        let openDate = new Date(req.body.openDate);
        let closeDate = new Date(req.body.closeDate);

        if(closeDate < openDate){
            return next(new ApiError(
                "Close Date Cannot Be Before The Opening Date", 400
            ))
        }


    let companyJob = await Job.create({userId: req.user.id,
                                        title: req.body.title,
                                        description: req.body.description,
                                        openDate: req.body.openDate,
                                        closeDate: req.body.closeDate,
                                        jobType: req.body.jobType,
                                        categoryId: req.body.categoryId,
                                        companyId: req.body.companyId
                                    });
    
    await companyJob.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: companyJob
    })
})


exports.updateCompanyJob = AsyncHandler(async (req, res, next)=>{

    const company = await Company.find({id: req.body.companyId});
    if(!company){ 
        return next(new ApiError(
            "Company not Found", 400
        ))
    }

    const category = await Category.find({id: req.body.categoryId});
    if(!category){ 
        return next(new ApiError(
            "Category not Found", 400
        ))
    }

    const userCompanies = await Company.find({userId: req.user.id}).select('userId');

    const exists = userCompanies[0].userId == req.user.id;

        if(!exists)
        {
            return next(new ApiError(
                "The Company Doesn't Belong to This Recruiter", 400
            ))

        }

        let openDate = new Date(req.body.openDate);
        let closeDate = new Date(req.body.closeDate);

        if(closeDate < openDate){
            return next(new ApiError(
                "Close Date Cannot Be Before The Opening Date", 400
            ))
        }

        let companyJob = await Job.findOneAndUpdate({_id: req.params.id}, 
                                                        {userId: req.user.id,
                                                            title: req.body.title,
                                                            description: req.body.description,
                                                            openDate: req.body.openDate,
                                                            closeDate: req.body.closeDate,
                                                            jobType: req.body.jobType,
                                                            categoryId: req.body.categoryId,
                                                            companyId: req.body.companyId
                                                        },
                                                        {new: true}
                                                        )

        if(!companyJob){
            return next(new ApiError(
                "Job not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { companyJob }
        });
});

exports.deleteCompanyJob = AsyncHandler(async (req, res, next)=>{

        const userCompanies = await Company.find({userId: req.user.id}).select('userId');

        const exists = userCompanies[0].userId == req.user.id;

        if(!exists)
        {
            return next(new ApiError(
                "The Company Doesn't Belong to This Recruiter", 400
            ))

        }

        const companyJob =await Job.findOneAndDelete({_id: req.params.id});

        if(!companyJob){
            return next(new ApiError(
                "Job not Found", 404
            ))
        }

        res.status(400).json({
            status: "Job Deleted Successfully",
            data: null
        })
})