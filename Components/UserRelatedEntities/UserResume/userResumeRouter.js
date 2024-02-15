const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");
const upload = require("../../../helpers/upload.helper");


const assignImage = (req, res, next) => {
    if (req.file?.location) {
      req.body.image = req.file.location;
    } else {
      delete req.body.image;
    }
    next();
  };


const { getAllUserResumes,
        getUserResume,
        addUserResume,
        updateUserResume,
        deleteUserResume 
      }
         = require("./UserResumeController")

const { 
    validateResumeId,
    validateAddResume,
    validateUpdateResume
} = require("./userResumeValidation")

const router = express.Router();

router.get("/getAll",protect, getAllUserResumes);

router.post("/addResume", validateAddResume, protect, upload.single('file'), addUserResume);

router.route('/:id')
      .all(protect, validateResumeId)
      .get(getUserResume)
      .put(validateUpdateResume, updateUserResume)
      .delete(deleteUserResume)




module.exports = router;





