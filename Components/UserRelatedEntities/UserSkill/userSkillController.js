const AsyncHandler = require("express-async-handler");
const UserSkill = require('./userSkill')
const ApiError = require("../../../Utils/ApiError");

exports.getAllUserSkills = AsyncHandler(async (req, res, next)=>{

    const skills = await UserSkill.find({userId: req.user.id});

    res.status(200).json({
        status: "success",
        data: skills
    });
});

exports.getUserSkill = AsyncHandler(async (req, res, next)=>{

    const skill = await UserSkill.findOne({userId: req.user.id, _id: req.params.id});

        if(!skill){
            return next(new ApiError(
                "Skill not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: skill
            }
        )
});


exports.addUserSkill = AsyncHandler(async (req, res, next)=>{

    let userSkill = await UserSkill.create({userId: req.user.id, skillName: req.body.skillName});
    
    await userSkill.save({validateBeforeSave: false});

    res.status(201).json({
        status: "Success",
        data: userSkill
    })
})


exports.updateUserSkill = AsyncHandler(async (req, res, next)=>{


    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);

    if(toDate < fromDate){
        return next(new ApiError(
            "Ending Date Cannot Be Before The Starting Date", 400
        ))
    }

        let userSkill = await UserSkill.findOneAndUpdate({_id: req.params.id}, {skillName: req.body.skillName}, {
            new: true
          })

        if(!userSkill){
            return next(new ApiError(
                "Skill not Found", 404
            ))
        }
        res.status(200).json({
            status: "Success",
            data: { userSkill }
        });
});

exports.deleteUserSkill = AsyncHandler(async (req, res, next)=>{

        const userSkill =await UserSkill.findOneAndDelete({userId: req.user.id, _id: req.params.id});

        if(!userSkill){
            return next(new ApiError(
                "Skill not Found", 404
            ))
        }

        res.status(400).json({
            status: "Deleted Successfully",
            data: null
        })
})