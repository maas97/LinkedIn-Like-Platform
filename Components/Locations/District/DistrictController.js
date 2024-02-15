const AsyncHandler = require("express-async-handler");
const District = require("../District/District");
const ApiError = require("../../../Utils/ApiError");
const Country = require("../Country/Country");

exports.getAllDistricts = AsyncHandler(async (req, res, next)=>{
    const districts = await District.find();
            

    res.status(200).json({
        status: "success",
        data: districts
    });
});

exports.getDistrict = AsyncHandler(async ({params}, res, next)=>{
    const {id} = params
    const district = await District.findById(id);


        if(district.length === 0){
            return next(new ApiError(
                "District not found", 404
            ))
        }
        res.status(200).json(
            {
                status: "success",
                data: district
            }
        )
});

exports.getDistrictsByCountryId = AsyncHandler (async ({params}, res, next)=>{

    const countryId = params.id;

    const DistrictsOfCountry = await District.find({countryId: countryId});

    if(DistrictsOfCountry.length === 0){
        return next(new ApiError(
            "No Districts found, Enter a Valid Country Id", 404
        ))
    }

    res.status(200).json(
        {
            status: "success",
            data: DistrictsOfCountry
        }
    )

} )

exports.getDistrictByCountryName = AsyncHandler( async ({params}, res, next)=>{

    const countryName = params.countryName;


    const country = await Country.find(
                    { "countryName": { "$regex": countryName, "$options": "i" } }
                    );

    // console.log('country by name')
    // console.log(country)
    if(country.length == 0){
        return next(new ApiError("There's no country with that name", 400))
    }

    const DistrictsOfCountry = [];

    for( let i = 0; i < country.length; i++ ) {
        // console.log(country[i].countryName)
        // console.log(country[i].id)
        DistrictsOfCountry.push( await District.find({countryId: country[i].id}) );
        // console.log('DistrictsOfCountry')
        // console.log(DistrictsOfCountry)
    }

    res.status(200).json(
        {
            status: "success",
            data: DistrictsOfCountry
        }
    )

})

