const express = require("express");
const userController = require("./UserController");
const {
        validateUserId,
        validateCreateUser,
        validateUpdateUser
        } = require("./UserValidation");

const router = express.Router();


router.route("/")
      .get(userController.getAllUsers)
      .post(validateCreateUser ,userController.createUser);


router.route(":/id")
      .all(validateUserId)
      .get(userController.getUser)
      .patch(validateUpdateUser ,userController.updateUser)
      .delete(userController.deleteUser)

// User Activation/Deactication

router.post("/:id/unban", validateUserId, userController.activateUser)
router.post("/:id/ban", validateUserId, userController.deActivateUser)

