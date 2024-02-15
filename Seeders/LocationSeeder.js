const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
// const uuid = require('uuid');
const Country = require('../Components/Locations/Country/Country');
const District = require('../Components/Locations/District/District');

var ObjectID = require('bson').ObjectId;


// To make it standalone file that run only once, so we prepare communication to db
dotenv.config({ path: ".env" });
const app = require('../app')
const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
)
const port = process.env.PORT;

mongoose
  .connect(db)
  .then(() => {
    console.log("DB Connected Successfully");
    // Run The Server
    // app.listen(port, () => {
    //   console.log(`App Running on port ${port}`);
    // });
  });

  // Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
    // app.exit();
    console.log("UNHANDLED REJECTION! 💥 Shutting Down...");
    console.log(err.name, err.stack, err.message);
    process.exit(1);
  });
  
  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    // app.exit();
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting Down...");
    console.log(err.name, err.message);
    process.exit(1);
  });

  let countries = []
  let districts = []


  let getCountries = async ()=>{
    const countryResponse = await axios.get('https://countriesnow.space/api/v0.1/countries');


    console.log('countryResponse')
    console.log(countryResponse.data.data)

    countryResponse.data.data.forEach(element => {

      if(element.country !== 'Israel'){

        let country = {};

        // var id  = new ObjectID();
        // console.log(id.toString());

        console.log("element")
        console.log(element.country)
        let country_id =  new ObjectID();
        country.countryName = element.country;
        country._id = country_id;
        countries.push(country);
        element.cities.forEach(element => {
            let district = {};
            // console.log("element")
            // console.log(element)
            let district_id = new ObjectID();

            district._id = district_id;
            district.districtName = element;
            district.countryId = country_id;
            // district.countryName = country.countryName;
            districts.push(district)
        })

        // console.log('countries$$$$$$$$$$')
        // console.log(countries)
      }
    });

    // console.log('new countries');
    // console.log(countries);

    // console.log('new districts');
    // console.log(districts);

    const seedLocationDB = async()=>{
      // console.log('new countries');
      // console.log(countries);
      await Country.deleteMany({});
      await Country.insertMany(countries);

      await District.deleteMany({});
      await District.insertMany(districts)
    }

    seedLocationDB();
  }
 
  getCountries();

  // console.log('new districts');
  // console.log(districts);
  
  // const seedCountry = [];

