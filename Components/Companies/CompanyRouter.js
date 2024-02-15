const express = require("express");
const {protect} = require("../User/Website/Auth/AuthController");
const upload = require("../../helpers/upload.helper");
const bodyParser = require('body-parser')

const assignImage = (req, res, next) => {
    if (req.file?.location) {
      req.body.image = req.file.location;
    } else {
      delete req.body.image;
    }
    next();
  };

const { getAllCompanies,
        getCompaniesOfSpecificRecruiter,
        getCompany,
        addUserCompany,
        updateUserCompany,
        deleteUserCompany 
      }
         = require("./CompanyController")

const { 
    validateCompanyId,
    validateAddCompany,
    validateUpdateCompany
} = require("./ComnpanyValidation")

const router = express.Router();

router.get("/getAll",protect, getAllCompanies);
router.get("/getAll/:userId",protect, getCompaniesOfSpecificRecruiter);

router.post("/addCompany", protect, validateAddCompany, upload.single('image'), assignImage , addUserCompany);

router.route('/:id')
      .all(protect, validateCompanyId)
      .get(getCompany)
      .put(validateUpdateCompany,upload.single('image'), assignImage, updateUserCompany)
      .delete(deleteUserCompany)

module.exports = router;





