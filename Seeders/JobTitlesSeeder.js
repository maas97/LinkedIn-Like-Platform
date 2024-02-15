const fetch = require('node-fetch');

(async () => {
  const where = encodeURIComponent(JSON.stringify({
    "title": {
      "$exists": true
    }
  }));
  const response = await fetch(
    `https://parseapi.back4app.com/classes/Occupations_Job`,
    {
      headers: {
        'X-Parse-Application-Id': 'KSsi4HvHW0AeQPa9NTdNKv5BUzqYLAzYmKuFsGQh', // This is your app's application id
        'X-Parse-REST-API-Key': 'Mm5oYP1QQpRZMWtGHBL0g6D9CouG2RmH2TBGiLWP', // This is your app's REST API key
      }
    }
  );
  const data = await response.json(); // Here you have the data that you need
  // console.log(Object.values(data));
  const titlesArray = [];
  let jobTitles = Object.values(data);

  jobTitles[0].forEach(Element=>{
    // console.log('Element.title')
    // console.log(Element.title)
    titlesArray.push(Element.title)
  })
  
    console.log('titlesArray')
    console.log(titlesArray)

    
})();