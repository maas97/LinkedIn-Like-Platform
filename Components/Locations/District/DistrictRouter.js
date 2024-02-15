const express = require("express");
const districtController = require("./DistrictController");
const { validateDistrictId, validateDistrictCountryName } = require("./DistrictValidation");

const router = express.Router();


router.route("/getAll")
      .get(districtController.getAllDistricts)


router.route("/:id")
      .all(validateDistrictId)
      .get(districtController.getDistrict)

router.route("/country/:id")
      .all(validateDistrictId)
      .get(districtController.getDistrictsByCountryId)

router.route("/countryName/:countryName")
      .all(validateDistrictCountryName)
      .get(districtController.getDistrictByCountryName)

module.exports = router;
