const express = require("express");
const JobCategoryController = require("./JobCategoryController");
const { validateJobCategoryId, validateCategoryName } = require("./JobCategoryValidation");

const router = express.Router();

router.route("/getAll")
      .get(JobCategoryController.getAllCategories)

router.route("/:id")
      .all(validateJobCategoryId)
      .get(JobCategoryController.getCategoryById)

router.route("/categoryName/:categoryName")
      .all(validateCategoryName)
      .get(JobCategoryController.getCategoryByName)


module.exports = router;
