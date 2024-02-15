const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });

const { getAllUserSkills, getUserSkill, addUserSkill, updateUserSkill, deleteUserSkill } = require("./userSkillController")


const { 
    validateUserSkillId,
    validateAddUserSkill,
    validateUpdateUserSkill
} = require("./userSkillValidation")

const router = express.Router();

router.get("/getAll",protect, getAllUserSkills);

router.post("/addSkill",protect, validateAddUserSkill, addUserSkill);

router.route('/:id')
      .all(protect, validateUserSkillId)
      .get(getUserSkill)
      .put(validateUpdateUserSkill, updateUserSkill)
      .delete(deleteUserSkill)




module.exports = router;





