const mongoose = require('mongoose');


const DistrictSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.ObjectId,
            auto: true
        },
        districtName: {
            type: String,
            trim: true
        },
        countryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Country",
            required: [true, "District Must Have at least One Country"],
        },
    }
)


const District = mongoose.model("District", DistrictSchema)

module.exports = District;