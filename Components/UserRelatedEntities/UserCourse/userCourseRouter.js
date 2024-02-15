const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");

const { getAllUserCourses,
        getUserCourse,
        addUserCourse,
        updateUserCourse,
        deleteUserCourse 
      }
         = require("./UserCourseController")

const { 
    validateCourseId,
    validateAddCourse,
    validateUpdateCourse
} = require("./UserCourseValidation")

const router = express.Router();

router.get("/getAll",protect, getAllUserCourses);

router.post("/addCourse", protect, validateAddCourse, addUserCourse);

router.route('/:id')
      .all(protect, validateCourseId)
      .get(getUserCourse)
      .put(validateUpdateCourse, updateUserCourse)
      .delete(deleteUserCourse)




module.exports = router;





