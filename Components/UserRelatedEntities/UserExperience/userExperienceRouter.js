const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");

const { getAllUserExperiences,
        getUserExperience,
        addUserExperience,
        updateUserExperience,
        deleteUserExperience 
      }
         = require("./userExperienceController")

const { 
    validateExperienceId,
    validateAddExperience,
    validateUpdateExperience
} = require("./userExperienceValidation")

const router = express.Router();

router.get("/getAll",protect, getAllUserExperiences);

router.post("/addExperience", protect, validateAddExperience, addUserExperience);

router.route('/:id')
      .all(protect, validateExperienceId)
      .get(getUserExperience)
      .put(validateUpdateExperience, updateUserExperience)
      .delete(deleteUserExperience)




module.exports = router;





