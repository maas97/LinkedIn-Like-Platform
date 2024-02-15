const AsyncHandler = require("express-async-handler");
const Country = require("../Country/Country");
const ApiError = require("../../../Utils/ApiError");

exports.getAllCountries = AsyncHandler(async (req, res, next)=>{
    const countries = await Country.find().then((res)=>{
        res.status(200).json({
            status: "success",
            data: countries
        });
    })
            
});

exports.getCountry = AsyncHandler(async ({params}, res, next)=>{
    const {id} = params
    const country = await Country.findById(id);


        if(country.length === 0){
            return next(new ApiError(
                "Country not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: country
            }
        )
});

