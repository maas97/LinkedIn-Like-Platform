const express = require("express");
const countryController = require("./CountryController");
const { validateCountryId } = require("./CountryValidation");

const router = express.Router();


router.route("/getAll")
      .get(countryController.getAllCountries)


router.route("/:id")
      .all(validateCountryId)
      .get(countryController.getCountry)


module.exports = router;
