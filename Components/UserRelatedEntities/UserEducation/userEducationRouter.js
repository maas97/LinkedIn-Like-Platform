const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");

const { getAllUserEducations,
        getUserEducation,
        addUserEducation,
        updateUserEducation,
        deleteUserEducation 
      }
         = require("./UserEducationController")

const { 
    validateEducationId,
    validateAddEducation,
    validateUpdateEducation
} = require("./UserEducationValidation")

const router = express.Router();

router.get("/getAll",protect, getAllUserEducations);

router.post("/addEducation", protect, validateAddEducation, addUserEducation);

router.route('/:id')
      .all(protect, validateEducationId)
      .get(getUserEducation)
      .put(validateUpdateEducation, updateUserEducation)
      .delete(deleteUserEducation)




module.exports = router;





