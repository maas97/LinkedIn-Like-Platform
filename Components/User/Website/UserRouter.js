const express = require("express");
const usersController = require("./UserController");
const {protect} = require("./Auth/AuthController");
const {validateUpdateProfile} = require("./UserValidation"); 
const upload = require("../../../helpers/upload.helper");


const assignImage = (req, res, next) => {
    if (req.file?.location) {
      req.body.image = req.file.location;
    } else {
      delete req.body.image;
    }
    next();
  };

const router = express.Router();


router.route("/").all(protect)
                 .get(usersController.getMyUser)
                 .put(upload.single('image'), assignImage, validateUpdateProfile, usersController.updateMyUser)
                 .delete(usersController.deactivateMyUser)

module.exports = router;
