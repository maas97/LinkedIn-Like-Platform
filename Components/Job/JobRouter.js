const express = require("express");
const {protect} = require("../User/Website/Auth/AuthController");

const { getAllJobs,
        getAllSpecificCompanyJobs,
        getSpecificJob,
        addCompanyJob,
        updateCompanyJob,
        deleteCompanyJob 
      }
         = require("./JobController")

const { 
    validateJobId,
    validateJobByCompanyId,
    validateAddJob,
    validateUpdateJob
} = require("./JobValidation")

const router = express.Router();

// router.get("/getAll",protect, getAllJobs);

router.get("/getAll",protect, getAllJobs);

router.get("/getAllCompanyJobs/:companyId",protect,validateJobByCompanyId, getAllSpecificCompanyJobs);

router.post("/addJob", protect, validateAddJob, addCompanyJob);

router.route('/:jobId')
      .all(protect, validateJobId)
      .get(getSpecificJob)
      .put(validateUpdateJob, updateCompanyJob)
      .delete(deleteCompanyJob)

module.exports = router;





