const mongoose = require('mongoose');


const   CountrySchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.SchemaTypes.ObjectId,
            auto: true
        },
        countryName: {
            type: String,
            trim: true
        },
    }
)


const Country = mongoose.model("Country", CountrySchema)

module.exports = Country;