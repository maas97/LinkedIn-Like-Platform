const express = require("express");
const {protect} = require("../../User/Website/Auth/AuthController");

const { 
        getAllUserJobApplications,
        getAllCompanyJobApplications,
        getOneUserJobApplication,
        getOneCompanyJobApplication,
        addUserJobApplication
      }
         = require("./JobApplicantController")

const { 
    validateJobApplicantId,
    validateAddJobApplicant,
    // validateUpdateJob
} = require("./JobApplicantValidation")

const router = express.Router();

// router.get("/getAll",protect, getAllJobs);

router.get("/getAllOfUser",protect, getAllUserJobApplications);

router.get("/getAllOfCompany/:companyId",protect, getAllCompanyJobApplications);

// router.post("/applyUserToJob", protect, validateAddJobApplicant, addUserJobApplication);
router.post("/applyUserToJob", protect, validateAddJobApplicant, addUserJobApplication);

router.route('/oneUserApplication/:id')
      .all(protect, validateJobApplicantId)
      .get(getOneUserJobApplication)
    //   .put(validateUpdateJob, updateCompanyJob)
     
      
router.route('/oneCompanyApplication/:id/:companyId')
      .all(protect, validateJobApplicantId)
      .get(getOneCompanyJobApplication)
      
//   .delete(deleteCompanyJob)

module.exports = router;





