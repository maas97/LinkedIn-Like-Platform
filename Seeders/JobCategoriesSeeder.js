const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const axios = require('axios');
const Category = require('../Components/JobRelatedEntites/JobCategory/JobCategory');
// var ObjectID = require('bson').ObjectId;

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

  let categories = [
    {
      _id: 1,
      categoryName: 'Accommodation Services',
      mainCategoryId: 0
    },
    {
      _id: 2,
      categoryName: 'Administrative and Support Services',
      mainCategoryId: 0
    },
    {
      _id: 3,
      categoryName: 'Construction',
      mainCategoryId: 0
    },
    {
      _id: 4,
      categoryName: 'Consumer Services',
      mainCategoryId: 0
    },
    {
      _id: 5,
      categoryName: 'Education',
      mainCategoryId: 0
    },
    {
      _id: 6,
      categoryName: 'Entertainment Providers',
      mainCategoryId: 0
    },
    {
      _id: 7,
      categoryName: 'Farming, Ranching, Forestry',
      mainCategoryId: 0
    },
    {
      _id: 8,
      categoryName: 'Financial Services',
      mainCategoryId: 0
    },
    {
      _id: 9,
      categoryName: 'Government Administration',
      mainCategoryId: 0
    },
    {
      _id: 10,
      categoryName: 'Holding Companies',
      mainCategoryId: 0
    },
    {
      _id: 11,
      categoryName: 'Hospitals and Health Care',
      mainCategoryId: 0
    },
    {
      _id: 12,
      categoryName: 'Manufacturing',
      mainCategoryId: 0
    },
    {
      _id: 13,
      categoryName: 'Oil, Gas, and Mining',
      mainCategoryId: 0
    },
    {
      _id: 14,
      categoryName: 'Professional Services',
      mainCategoryId: 0
    },
    {
      _id: 15,
      categoryName: 'Real Estate and Equipment Rental Services',
      mainCategoryId: 0
    },
    {
      _id: 16,
      categoryName: 'Retail',
      mainCategoryId: 0
    },
    {
      _id: 17,
      categoryName: 'Technology, Information and Media',
      mainCategoryId: 0
    },
    {
      _id: 18,
      categoryName: 'Transportation, Logistics, Supply Chain and Storage',
      mainCategoryId: 0
    },
    {
      _id: 19,
      categoryName: 'Utilities',
      mainCategoryId: 0
    },
    {
      _id: 20,
      categoryName: 'Wholesale',
      mainCategoryId: 0
    },
    {
      _id: 21,
      categoryName: 'Food and Beverage Services',
      mainCategoryId: 1
    },
    {
      _id: 22,
      categoryName: 'Caterers',
      mainCategoryId: 21
    },{
      _id: 23,
      categoryName: 'Mobile Food Services',
      mainCategoryId: 21
    },{
      _id: 24,
      categoryName: 'Restaurants',
      mainCategoryId: 21
    },{
      _id: 25,
      categoryName: 'Hospitality',
      mainCategoryId: 1
    },{
      _id: 26,
      categoryName: 'Bed-and-Breakfasts, Hostels, Homestays',
      mainCategoryId: 25
    },{
      _id: 27,
      categoryName: 'Hotels and Motels	',
      mainCategoryId: 25
    },{
      _id: 28,
      categoryName: 'Collection Agencies',
      mainCategoryId: 2
    },{
      _id: 29,
      categoryName: 'Events Services',
      mainCategoryId: 2
    },{
      _id: 30,
      categoryName: 'Facilities Services',
      mainCategoryId: 2
    },{
      _id: 31,
      categoryName: 'Janitorial Services',
      mainCategoryId: 30
    },{
      _id: 32,
      categoryName: 'Landscaping Services',
      mainCategoryId: 30
    },{
      _id: 33,
      categoryName: 'Fundraising',
      mainCategoryId: 2
    },{
      _id: 34,
      categoryName: 'Office Administration',
      mainCategoryId: 2
    },{
      _id: 35,
      categoryName: 'Security and Investigations',
      mainCategoryId: 2
    },{
      _id: 36,
      categoryName: 'Security Guards and Patrol Services',
      mainCategoryId: 35
    },{
      _id: 37,
      categoryName: '	Security Systems Services',
      mainCategoryId: 35
    },{
      _id: 38,
      categoryName: 'Staffing and Recruiting',
      mainCategoryId: 2
    },{
      _id: 39,
      categoryName: 'Executive Search Services',
      mainCategoryId: 38
    },{
      _id: 40,
      categoryName: 'Temporary Help Services',
      mainCategoryId: 38
    },{
      _id: 41,
      categoryName: '	Telephone Call Centers',
      mainCategoryId: 2
    },{
      _id: 42,
      categoryName: '	Translation and Localization',
      mainCategoryId: 2
    },{
      _id: 43,
      categoryName: 'Travel Arrangements',
      mainCategoryId: 2
    },{
      _id: 44,
      categoryName: 'Writing and Editing',
      mainCategoryId: 2
    },{
      _id: 45,
      categoryName: 'Building Construction',
      mainCategoryId: 3
    },{
      _id: 46,
      categoryName: 'Nonresidential Building Construction',
      mainCategoryId: 45
    },{
      _id: 47,
      categoryName: 'Residential Building Construction',
      mainCategoryId: 45
    },{
      _id: 48,
      categoryName: 'Civil Engineering',
      mainCategoryId: 3
    },{
      _id: 49,
      categoryName: 'Highway, Street, and Bridge Construction',
      mainCategoryId: 48
    },{
      _id: 50,
      categoryName: 'Subdivision of Land',
      mainCategoryId: 48
    },{
      _id: 51,
      categoryName: '	Utility System Construction',
      mainCategoryId: 48
    },{
      _id: 52,
      categoryName: '	Specialty Trade Contractors',
      mainCategoryId: 3
    },{
      _id: 53,
      categoryName: 'Building Equipment Contractors',
      mainCategoryId: 52
    },{
      _id: 54,
      categoryName: 'Building Finishing Contractors',
      mainCategoryId: 52
    },{
      _id: 55,
      categoryName: 'Building Structure and Exterior Contractors',
      mainCategoryId: 52
    },{
      _id: 56,
      categoryName: 'Civic and Social Organizations',
      mainCategoryId: 4
    },{
      _id: 57,
      categoryName: 'Industry Associations',
      mainCategoryId: 56
    },{
      _id: 58,
      categoryName: 'Political Organizations',
      mainCategoryId: 56
    },{
      _id: 59,
      categoryName: 'Professional Organizations',
      mainCategoryId: 56
    },{
      _id: 60,
      categoryName: '	Household Services',
      mainCategoryId: 4
    },{
      _id: 61,
      categoryName: 'Non-profit Organizations',
      mainCategoryId: 4
    },{
      _id: 62,
      categoryName: 'Personal and Laundry Services',
      mainCategoryId: 4
    },{
      _id: 63,
      categoryName: 'Laundry and Drycleaning Services',
      mainCategoryId: 62
    },{
      _id: 64,
      categoryName: '	Personal Care Services',
      mainCategoryId: 62
    },{
      _id: 65,
      categoryName: 'Pet Services',
      mainCategoryId: 62
    },{
      _id: 66,
      categoryName: 'Philanthropic Fundraising Services',
      mainCategoryId: 4
    },{
      _id: 67,
      categoryName: 'Religious Institutions',
      mainCategoryId: 4
    },{
      _id: 68,
      categoryName: 'Repair and Maintenance',
      mainCategoryId: 4
    },{
      _id: 69,
      categoryName: 'Commercial and Industrial Machinery Maintenance',
      mainCategoryId: 68
    },{
      _id: 70,
      categoryName: '	Electronic and Precision Equipment Maintenance',
      mainCategoryId: 68
    },{
      _id: 71,
      categoryName: 'Footwear and Leather Goods Repair',
      mainCategoryId: 68
    },{
      _id: 72,
      categoryName: 'Reupholstery and Furniture Repair',
      mainCategoryId: 68
    },{
      _id: 73,
      categoryName: 'Vehicle Repair and Maintenance',
      mainCategoryId: 68
    },{
      _id: 74,
      categoryName: 'E-Learning Providers',
      mainCategoryId: 5
    },{
      _id: 75,
      categoryName: 'Higher Education',
      mainCategoryId: 5
    },{
      _id: 76,
      categoryName: 'Primary and Secondary Education',
      mainCategoryId: 5
    },{
      _id: 77,
      categoryName: 'Professional Training and Coaching',
      mainCategoryId: 5
    },{
      _id: 78,
      categoryName: 'Technical and Vocational Training',
      mainCategoryId: 5
    },{
      _id: 79,
      categoryName: '	Cosmetology and Barber Schools',
      mainCategoryId: 78
    },{
      _id: 80,
      categoryName: 'Fine Arts Schools',
      mainCategoryId: 78
    },{
      _id: 81,
      categoryName: 'Flight Training',
      mainCategoryId: 78
    },{
      _id: 82,
      categoryName: 'Language Schools',
      mainCategoryId: 78
    },{
      _id: 83,
      categoryName: 'Secretarial Schools',
      mainCategoryId: 78
    },{
      _id: 84,
      categoryName: 'Sports and Recreation Instruction',
      mainCategoryId: 78
    },{
      _id: 85,
      categoryName: 'Artists and Writers',
      mainCategoryId: 6
    },{
      _id: 86,
      categoryName: 'Museums, Historical Sites, and Zoos',
      mainCategoryId: 6
    },
    {
      _id: 87,
      categoryName: 'Historical Sites	',
      mainCategoryId: 86
    },{
      _id: 88,
      categoryName: 'Museums',
      mainCategoryId: 86
    },{
      _id: 89,
      categoryName: 'Zoos and Botanical Gardens',
      mainCategoryId: 86
    },{
      _id: 90,
      categoryName: 'Musicians',
      mainCategoryId: 6
    },{
      _id: 91,
      categoryName: 'Performing Arts and Spectator Sports',
      mainCategoryId: 6
    },{
      _id: 92,
      categoryName: 'Circuses and Magic Shows',
      mainCategoryId: 91
    },{
      _id: 93,
      categoryName: 'Dance Companies',
      mainCategoryId: 91
    },{
      _id: 94,
      categoryName: 'Performing Arts	',
      mainCategoryId: 91
    },{
      _id: 95,
      categoryName: 'Spectator Sports',
      mainCategoryId: 91
    },{
      _id: 96,
      categoryName: 'Racetracks',
      mainCategoryId: 95
    },{
      _id: 97,
      categoryName: 'Sports Teams and Clubs',
      mainCategoryId: 95
    },{
      _id: 98,
      categoryName: 'Theater Companies',
      mainCategoryId: 91
    },{
      _id: 99,
      categoryName: 'Recreational Facilities',
      mainCategoryId: 6
    },{
      _id: 100,
      categoryName: 'Amusement Parks and Arcades',
      mainCategoryId: 99
    },{
      _id: 101,
      categoryName: 'Golf Courses and Country Clubs',
      mainCategoryId: 99
    },{
      _id: 102,
      categoryName: 'Skiing Facilities',
      mainCategoryId: 99
    },{
      _id: 103,
      categoryName: 'Wellness and Fitness Services',
      mainCategoryId: 99
    },{
      _id: 104,
      categoryName: 'Farming',
      mainCategoryId: 7
    },{
      _id: 105,
      categoryName: 'Horticulture',
      mainCategoryId: 104
    },{
      _id: 106,
      categoryName: 'Forestry and Logging',
      mainCategoryId: 7
    },{
      _id: 107,
      categoryName: 'Ranching and Fisheries',
      mainCategoryId: 7
    },{
      _id: 108,
      categoryName: 'Fisheries',
      mainCategoryId: 107
    },{
      _id: 109,
      categoryName: 'Ranching',
      mainCategoryId: 107
    },{
      _id: 110,
      categoryName: 'Capital Markets',
      mainCategoryId: 8
    },{
      _id: 111,
      categoryName: 'Investment Advice',
      mainCategoryId: 110
    },{
      _id: 112,
      categoryName: 'Investment Banking',
      mainCategoryId: 110
    },{
      _id: 113,
      categoryName: 'Investment Management',
      mainCategoryId: 110
    },{
      _id: 114,
      categoryName: '	Securities and Commodity Exchanges',
      mainCategoryId: 110
    },{
      _id: 115,
      categoryName: 'Venture Capital and Private Equity Principals',
      mainCategoryId: 110
    },{
      _id: 116,
      categoryName: 'Credit Intermediation',
      mainCategoryId: 8
    },{
      _id: 117,
      categoryName: 'Banking',
      mainCategoryId: 116
    },{
      _id: 118,
      categoryName: 'International Trade and Development',
      mainCategoryId: 116
    },{
      _id: 119,
      categoryName: 'Loan Brokers',
      mainCategoryId: 116
    },{
      _id: 120,
      categoryName: 'Savings Institutions',
      mainCategoryId: 116
    },{
      _id: 121,
      categoryName: 'Funds and Trusts',
      mainCategoryId: 8
    },
    {
      _id: 122,
      categoryName: 'Insurance and Employee Benefit Funds',
      mainCategoryId: 121
    },{
      _id: 123,
      categoryName: 'Pension Funds',
      mainCategoryId: 121
    },{
      _id: 124,
      categoryName: 'Trusts and Estates',
      mainCategoryId: 121
    },{
      _id: 125,
      categoryName: 'Insurance',
      mainCategoryId: 8
    },{
      _id: 126,
      categoryName: 'Claims Adjusting, Actuarial Services',
      mainCategoryId: 125
    },{
      _id: 127,
      categoryName: 'Insurance Agencies and Brokerages',
      mainCategoryId: 125
    },{
      _id: 128,
      categoryName: 'Insurance Carriers',
      mainCategoryId: 125
    },{
      _id: 129,
      categoryName: 'Administration of Justice',
      mainCategoryId: 9
    },{
      _id: 130,
      categoryName: 'Correctional Institutions',
      mainCategoryId: 129
    },{
      _id: 131,
      categoryName: 'Courts of Law',
      mainCategoryId: 129
    },{
      _id: 132,
      categoryName: 'Fire Protection',
      mainCategoryId: 129
    },{
      _id: 133,
      categoryName: 'Law Enforcement',
      mainCategoryId: 129
    },{
      _id: 134,
      categoryName: 'Public Safety',
      mainCategoryId: 129
    },{
      _id: 135,
      categoryName: 'Economic Programs',
      mainCategoryId: 9
    },{
      _id: 136,
      categoryName: 'Transportation Programs',
      mainCategoryId: 135
    },{
      _id: 137,
      categoryName: 'Utilities Administration',
      mainCategoryId: 135
    },{
      _id: 138,
      categoryName: 'Environmental Quality Programs',
      mainCategoryId: 9
    },{
      _id: 139,
      categoryName: 'Air, Water, and Waste Program Management',
      mainCategoryId: 138
    },{
      _id: 140,
      categoryName: 'Conservation Programs',
      mainCategoryId: 138
    },{
      _id: 141,
      categoryName: 'Health and Human Services',
      mainCategoryId: 9
    },{
      _id: 142,
      categoryName: 'Education Administration Programs',
      mainCategoryId: 141
    },{
      _id: 143,
      categoryName: 'Public Assistance Programs',
      mainCategoryId: 141
    },{
      _id: 144,
      categoryName: 'Public Health',
      mainCategoryId: 141
    },{
      _id: 145,
      categoryName: 'Housing and Community Development',
      mainCategoryId: 9
    },{
      _id: 146,
      categoryName: 'Community Development and Urban Planning',
      mainCategoryId: 145
    },{
      _id: 147,
      categoryName: 'Housing Programs',
      mainCategoryId: 145
    },{
      _id: 148,
      categoryName: 'Military and International Affairs',
      mainCategoryId: 9
    },{
      _id: 149,
      categoryName: 'Armed Forces',
      mainCategoryId: 148
    },{
      _id: 150,
      categoryName: 'International Affairs',
      mainCategoryId: 148
    },{
      _id: 151,
      categoryName: 'Public Policy Offices',
      mainCategoryId: 9
    },{
      _id: 152,
      categoryName: 'Executive Offices',
      mainCategoryId: 151
    },{
      _id: 153,
      categoryName: 'Legislative Offices',
      mainCategoryId: 151
    },{
      _id: 154,
      categoryName: 'Space Research and Technology',
      mainCategoryId: 9
    },
    {
      _id: 155,
      categoryName: 'Community Services',
      mainCategoryId: 11
    },{
      _id: 156,
      categoryName: 'Services for the Elderly and Disabled',
      mainCategoryId: 155
    },{
      _id: 157,
      categoryName: 'Hospitals',
      mainCategoryId: 11
    },{
      _id: 158,
      categoryName: 'Individual and Family Services',
      mainCategoryId: 11
    },{
      _id: 159,
      categoryName: 'Child Day Care Services',
      mainCategoryId: 158
    },{
      _id: 160,
      categoryName: 'Emergency and Relief Services',
      mainCategoryId: 158
    },{
      _id: 161,
      categoryName: 'Vocational Rehabilitation Services',
      mainCategoryId: 158
    },{
      _id: 162,
      categoryName: 'Medical Practices',
      mainCategoryId: 11
    },{
      _id: 163,
      categoryName: 'Alternative Medicine',
      mainCategoryId: 162
    },{
      _id: 164,
      categoryName: 'Ambulance Services',
      mainCategoryId: 162
    },{
      _id: 165,
      categoryName: 'Chiropractors',
      mainCategoryId: 162
    },{
      _id: 166,
      categoryName: 'Dentists',
      mainCategoryId: 162
    },{
      _id: 167,
      categoryName: 'Family Planning Centers',
      mainCategoryId: 162
    },{
      _id: 168,
      categoryName: 'Home Health Care Services',
      mainCategoryId: 162
    },{
      _id: 169,
      categoryName: 'Medical and Diagnostic Laboratories',
      mainCategoryId: 162
    },{
      _id: 170,
      categoryName: 'Mental Health Care',
      mainCategoryId: 162
    },{
      _id: 171,
      categoryName: 'Optometrists',
      mainCategoryId: 162
    },{
      _id: 172,
      categoryName: 'Outpatient Care Centers',
      mainCategoryId: 162
    },{
      _id: 173,
      categoryName: 'Physical, Occupational and Speech Therapists',
      mainCategoryId: 162
    },{
      _id: 174,
      categoryName: 'Physicians',
      mainCategoryId: 162
    },{
      _id: 175,
      categoryName: 'Nursing Homes and Residential Care Facilities',
      mainCategoryId: 11
    },{
      _id: 176,
      categoryName: 'Apparel Manufacturing',
      mainCategoryId: 12
    },{
      _id: 177,
      categoryName: 'Fashion Accessories Manufacturing',
      mainCategoryId: 176
    },{
      _id: 178,
      categoryName: 'Appliances, Electrical, and Electronics Manufacturing',
      mainCategoryId: 176
    },{
      _id: 179,
      categoryName: 'Electric Lighting Equipment Manufacturing',
      mainCategoryId: 178
    },{
      _id: 180,
      categoryName: 'Electrical Equipment Manufacturing',
      mainCategoryId: 178
    },{
      _id: 181,
      categoryName: 'Fuel Cell Manufacturing',
      mainCategoryId: 180
    },{
      _id: 182,
      categoryName: 'Household Appliance Manufacturing',
      mainCategoryId: 178
    },{
      _id: 183,
      categoryName: 'Chemical Manufacturing',
      mainCategoryId: 12
    },{
      _id: 184,
      categoryName: 'Agricultural Chemical Manufacturing',
      mainCategoryId: 183
    },{
      _id: 185,
      categoryName: 'Artificial Rubber and Synthetic Fiber Manufacturing',
      mainCategoryId: 183
    },{
      _id: 186,
      categoryName: 'Chemical Raw Materials Manufacturing',
      mainCategoryId: 183
    },{
      _id: 187,
      categoryName: 'Paint, Coating, and Adhesive Manufacturing',
      mainCategoryId: 183
    },{
      _id: 188,
      categoryName: 'Personal Care Product Manufacturing',
      mainCategoryId: 183
    },{
      _id: 189,
      categoryName: 'Pharmaceutical Manufacturing',
      mainCategoryId: 183
    },{
      _id: 190,
      categoryName: 'Soap and Cleaning Product Manufacturing',
      mainCategoryId: 183
    },{
      _id: 191,
      categoryName: 'Climate Technology Product Manufacturing',
      mainCategoryId: 12
    },{
      _id: 192,
      categoryName: 'Computers and Electronics Manufacturing',
      mainCategoryId: 12
    },{
      _id: 193,
      categoryName: 'Audio and Video Equipment Manufacturing',
      mainCategoryId: 192
    },{
      _id: 194,
      categoryName: 'Communications Equipment Manufacturing',
      mainCategoryId: 192
    },{
      _id: 195,
      categoryName: 'Computer Hardware Manufacturing',
      mainCategoryId: 192
    },{
      _id: 196,
      categoryName: 'Accessible Hardware Manufacturing',
      mainCategoryId: 195
    },{
      _id: 197,
      categoryName: 'Magnetic and Optical Media Manufacturing',
      mainCategoryId: 192
    },{
      _id: 198,
      categoryName: 'Measuring and Control Instrument Manufacturing',
      mainCategoryId: 192
    },{
      _id: 199,
      categoryName: 'Smart Meter Manufacturing',
      mainCategoryId: 198
    },{
      _id: 200,
      categoryName: 'Semiconductor Manufacturing',
      mainCategoryId: 195
    },{
      _id: 201,
      categoryName: 'Renewable Energy Semiconductor Manufacturing',
      mainCategoryId: 200
    },{
      _id: 202,
      categoryName: 'Fabricated Metal Products',
      mainCategoryId: 12
    },{
      _id: 203,
      categoryName: 'Architectural and Structural Metal Manufacturing',
      mainCategoryId: 202
    },{
      _id: 204,
      categoryName: 'Boilers, Tanks, and Shipping Container Manufacturing',
      mainCategoryId: 202
    },{
      _id: 205,
      categoryName: 'Construction Hardware Manufacturing',
      mainCategoryId: 202
    },{
      _id: 206,
      categoryName: 'Cutlery and Handtool Manufacturing',
      mainCategoryId: 202
    },
    {
      _id: 207,
      categoryName: 'Metal Treatments',
      mainCategoryId: 202
    },{
      _id: 208,
      categoryName: 'Metal Valve, Ball, and Roller Manufacturing',
      mainCategoryId: 202
    },{
      _id: 209,
      categoryName: 'Spring and Wire Product Manufacturing',
      mainCategoryId: 202
    },{
      _id: 210,
      categoryName: 'Turned Products and Fastener Manufacturing',
      mainCategoryId: 202
    },{
      _id: 211,
      categoryName: 'Food and Beverage Manufacturing',
      mainCategoryId: 12
    },{
      _id: 212,
      categoryName: 'Animal Feed Manufacturing',
      mainCategoryId: 211
    },{
      _id: 213,
      categoryName: 'Baked Goods Manufacturing',
      mainCategoryId: 211
    },{
      _id: 214,
      categoryName: 'Beverage Manufacturing',
      mainCategoryId: 211
    },{
      _id: 215,
      categoryName: 'Dairy Product Manufacturingg',
      mainCategoryId: 211
    },{
      _id: 216,
      categoryName: 'Fruit and Vegetable Preserves Manufacturing',
      mainCategoryId: 211
    },{
      _id: 217,
      categoryName: '	Meat Products Manufacturing',
      mainCategoryId: 211
    },{
      _id: 218,
      categoryName: 'Seafood Product Manufacturing',
      mainCategoryId: 211
    },{
      _id: 219,
      categoryName: 'Sugar and Confectionery Product Manufacturing',
      mainCategoryId: 211
    },{
      _id: 220,
      categoryName: 'Furniture and Home Furnishings Manufacturing',
      mainCategoryId: 12
    },{
      _id: 221,
      categoryName: 'Household and Institutional Furniture Manufacturing',
      mainCategoryId: 220
    },{
      _id: 222,
      categoryName: 'Mattress and Blinds Manufacturing',
      mainCategoryId: 220
    },{
      _id: 223,
      categoryName: 'Office Furniture and Fixtures Manufacturing',
      mainCategoryId: 220
    },{
      _id: 224,
      categoryName: 'Glass, Ceramics and Concrete Manufacturing',
      mainCategoryId: 12
    },{
      _id: 225,
      categoryName: 'Abrasives and Nonmetallic Minerals Manufacturing',
      mainCategoryId: 224
    },{
      _id: 226,
      categoryName: 'Clay and Refractory Products Manufacturing',
      mainCategoryId: 224
    },{
      _id: 227,
      categoryName: 'Glass Product Manufacturing',
      mainCategoryId: 224
    },{
      _id: 228,
      categoryName: 'Lime and Gypsum Products Manufacturing',
      mainCategoryId: 224
    },{
      _id: 229,
      categoryName: 'Leather Product Manufacturing',
      mainCategoryId: 12
    },{
      _id: 230,
      categoryName: 'Footwear Manufacturing',
      mainCategoryId: 229
    },{
      _id: 231,
      categoryName: 'Women Handbag Manufacturing',
      mainCategoryId: 229
    },{
      _id: 232,
      categoryName: 'Machinery Manufacturing',
      mainCategoryId: 12
    },{
      _id: 233,
      categoryName: 'Agriculture, Construction, Mining Machinery Manufacturing',
      mainCategoryId: 232
    },{
      _id: 234,
      categoryName: 'Automation Machinery Manufacturing',
      mainCategoryId: 232
    },{
      _id: 235,
      categoryName: 'Robot Manufacturing',
      mainCategoryId: 232
    },{
      _id: 236,
      categoryName: 'Commercial and Service Industry Machinery Manufacturing',
      mainCategoryId: 232
    },{
      _id: 237,
      categoryName: 'Engines and Power Transmission Equipment Manufacturing',
      mainCategoryId: 232
    },{
      _id: 238,
      categoryName: 'Renewable Energy Equipment Manufacturing',
      mainCategoryId: 237
    },{
      _id: 239,
      categoryName: 'HVAC and Refrigeration Equipment Manufacturing',
      mainCategoryId: 232
    },{
      _id: 240,
      categoryName: 'Industrial Machinery Manufacturing',
      mainCategoryId: 232
    },{
      _id: 241,
      categoryName: 'Metalworking Machinery Manufacturing',
      mainCategoryId: 232
    },{
      _id: 242,
      categoryName: 'Medical Equipment Manufacturing',
      mainCategoryId: 12
    },{
      _id: 243,
      categoryName: 'Oil and Coal Product Manufacturing',
      mainCategoryId: 12
    },{
      _id: 245,
      categoryName: 'Paper and Forest Product Manufacturing',
      mainCategoryId: 12
    },{
      _id: 246,
      categoryName: 'Plastics and Rubber Product Manufacturing',
      mainCategoryId: 202
    },{
      _id: 247,
      categoryName: 'Packaging and Containers Manufacturing',
      mainCategoryId: 246
    },{
      _id: 248,
      categoryName: 'Plastics Manufacturing',
      mainCategoryId: 246
    },
    {
      _id: 249,
      categoryName: 'Rubber Products Manufacturing',
      mainCategoryId: 246
    },{
      _id: 250,
      categoryName: 'Primary Metal Manufacturing',
      mainCategoryId: 12
    },{
      _id: 251,
      categoryName: 'Sporting Goods Manufacturing',
      mainCategoryId: 12
    },{
      _id: 252,
      categoryName: 'Textile Manufacturing',
      mainCategoryId: 12
    },{
      _id: 253,
      categoryName: 'Transportation Equipment Manufacturing',
      mainCategoryId: 12
    },{
      _id: 254,
      categoryName: 'Aviation and Aerospace Component Manufacturing',
      mainCategoryId: 253
    },{
      _id: 255,
      categoryName: 'Defense and Space Manufacturing',
      mainCategoryId: 253
    },{
      _id: 256,
      categoryName: 'Motor Vehicle Manufacturing',
      mainCategoryId: 253
    },{
      _id: 257,
      categoryName: 'Alternative Fuel Vehicle Manufacturing',
      mainCategoryId: 256
    },{
      _id: 258,
      categoryName: 'Motor Vehicle Parts Manufacturing',
      mainCategoryId: 253
    },{
      _id: 259,
      categoryName: 'Railroad Equipment Manufacturing',
      mainCategoryId: 253
    },{
      _id: 260,
      categoryName: 'Shipbuilding',
      mainCategoryId: 253
    },{
      _id: 261,
      categoryName: 'Wood Product Manufacturing',
      mainCategoryId: 12
    },{
      _id: 262,
      categoryName: 'Mining',
      mainCategoryId: 13
    },{
      _id: 263,
      categoryName: 'Coal Mining',
      mainCategoryId: 262
    },{
      _id: 264,
      categoryName: 'Metal Ore Mining',
      mainCategoryId: 262
    },{
      _id: 265,
      categoryName: 'Nonmetallic Mineral Mining',
      mainCategoryId: 262
    },{
      _id: 266,
      categoryName: 'Oil and Gas',
      mainCategoryId: 13
    },{
      _id: 267,
      categoryName: 'Natural Gas Extraction',
      mainCategoryId: 266
    },{
      _id: 268,
      categoryName: 'Oil Extraction',
      mainCategoryId: 266
    },{
      _id: 269,
      categoryName: 'Accounting',
      mainCategoryId: 14
    },{
      _id: 270,
      categoryName: 'Advertising Services',
      mainCategoryId: 14
    },{
      _id: 271,
      categoryName: 'Government Relations Services',
      mainCategoryId: 270
    },{
      _id: 272,
      categoryName: 'Public Relations and Communications Services',
      mainCategoryId: 270
    },{
      _id: 273,
      categoryName: 'Market Research',
      mainCategoryId: 270
    },{
      _id: 274,
      categoryName: 'Architecture and Planning',
      mainCategoryId: 14
    },{
      _id: 275,
      categoryName: 'Accessible Architecture and Design',
      mainCategoryId: 274
    },{
      _id: 276,
      categoryName: 'Business Consulting and Services',
      mainCategoryId: 14
    },{
      _id: 277,
      categoryName: 'Environmental Services',
      mainCategoryId: 276
    },{
      _id: 278,
      categoryName: 'Human Resources Services',
      mainCategoryId: 276
    },{
      _id: 279,
      categoryName: 'Marketing Services',
      mainCategoryId: 276
    },{
      _id: 280,
      categoryName: 'Operations Consulting',
      mainCategoryId: 276
    },{
      _id: 281,
      categoryName: 'Outsourcing and Offshoring Consulting',
      mainCategoryId: 276
    },{
      _id: 282,
      categoryName: 'Strategic Management Services',
      mainCategoryId: 276
    },{
      _id: 283,
      categoryName: 'Design Services',
      mainCategoryId: 14
    },{
      _id: 284,
      categoryName: 'Graphic Design',
      mainCategoryId: 283
    },{
      _id: 285,
      categoryName: 'Regenerative Design',
      mainCategoryId: 283
    },{
      _id: 286,
      categoryName: 'Interior Design',
      mainCategoryId: 283
    },{
      _id: 287,
      categoryName: 'Engineering Services',
      mainCategoryId: 14
    },{
      _id: 288,
      categoryName: 'Robotics Engineering',
      mainCategoryId: 287
    },{
      _id: 289,
      categoryName: 'Surveying and Mapping Services',
      mainCategoryId: 287
    },{
      _id: 290,
      categoryName: 'IT Services and IT Consulting',
      mainCategoryId: 14
    },{
      _id: 291,
      categoryName: 'Computer and Network Security',
      mainCategoryId: 290
    },{
      _id: 292,
      categoryName: 'Digital Accessibility Services',
      mainCategoryId: 290
    },{
      _id: 293,
      categoryName: 'IT System Custom Software Development',
      mainCategoryId: 290
    },{
      _id: 294,
      categoryName: 'IT System Data Services',
      mainCategoryId: 290
    },{
      _id: 295,
      categoryName: 'IT System Design Services',
      mainCategoryId: 290
    },{
      _id: 296,
      categoryName: 'IT System Installation and Disposal',
      mainCategoryId: 290
    },{
      _id: 297,
      categoryName: 'IT System Operations and Maintenance',
      mainCategoryId: 290
    },{
      _id: 298,
      categoryName: 'IT System Testing and Evaluation',
      mainCategoryId: 290
    },{
      _id: 299,
      categoryName: 'IT System Training and Support',
      mainCategoryId: 290
    },{
      _id: 300,
      categoryName: 'Legal Services',
      mainCategoryId: 14
    },{
      _id: 301,
      categoryName: 'Alternative Dispute Resolution',
      mainCategoryId: 300
    },{
      _id: 302,
      categoryName: 'Photography',
      mainCategoryId: 14
    },{
      _id: 303,
      categoryName: 'Research Services',
      mainCategoryId: 14
    },{
      _id: 304,
      categoryName: 'Biotechnology Research',
      mainCategoryId: 303
    },{
      _id: 306,
      categoryName: 'Nanotechnology Research',
      mainCategoryId: 303
    },{
      _id: 307,
      categoryName: 'Services for Renewable Energy',
      mainCategoryId: 14
    },{
      _id: 308,
      categoryName: 'Veterinary Services',
      mainCategoryId: 14
    },{
      _id: 309,
      categoryName: 'Equipment Rental Services',
      mainCategoryId: 15
    },{
      _id: 310,
      categoryName: 'Commercial and Industrial Equipment Rental',
      mainCategoryId: 309
    },{
      _id: 311,
      categoryName: 'Consumer Goods Rental',
      mainCategoryId: 309
    },{
      _id: 312,
      categoryName: 'Real Estate',
      mainCategoryId: 15
    },{
      _id: 313,
      categoryName: 'Leasing Non-residential Real Estate',
      mainCategoryId: 312
    },{
      _id: 314,
      categoryName: 'Leasing Residential Real Estate',
      mainCategoryId: 312
    },{
      _id: 315,
      categoryName: 'Real Estate Agents and Brokers',
      mainCategoryId: 312
    },{
      _id: 316,
      categoryName: 'Food and Beverage Retail',
      mainCategoryId: 16
    },{
      _id: 317,
      categoryName: 'Retail Groceries',
      mainCategoryId: 316
    },{
      _id: 318,
      categoryName: 'Online and Mail Order Retail',
      mainCategoryId: 16
    },{
      _id: 319,
      categoryName: 'Retail Apparel and Fashion',
      mainCategoryId: 16
    },{
      _id: 320,
      categoryName: 'Retail Appliances, Electrical, and Electronic Equipment',
      mainCategoryId: 16
    },{
      _id: 321,
      categoryName: 'Retail Art Dealers',
      mainCategoryId: 16
    },{
      _id: 322,
      categoryName: 'Retail Art Supplies',
      mainCategoryId: 16
    },{
      _id: 323,
      categoryName: 'Retail Books and Printed News',
      mainCategoryId: 16
    },{
      _id: 324,
      categoryName: 'Retail Building Materials and Garden Equipment',
      mainCategoryId: 16
    },{
      _id: 325,
      categoryName: 'Retail Florists',
      mainCategoryId: 16
    },{
      _id: 326,
      categoryName: 'Retail Furniture and Home Furnishings',
      mainCategoryId: 16
    },{
      _id: 327,
      categoryName: 'Retail Gasoline',
      mainCategoryId: 16
    },{
      _id: 328,
      categoryName: 'Retail Health and Personal Care Products',
      mainCategoryId: 16
    },{
      _id: 329,
      categoryName: 'Retail Pharmacies',
      mainCategoryId: 328
    },{
      _id: 330,
      categoryName: 'Retail Luxury Goods and Jewelry',
      mainCategoryId: 16
    },{
      _id: 331,
      categoryName: 'Retail Motor Vehicles',
      mainCategoryId: 16
    },{
      _id: 332,
      categoryName: 'Retail Musical Instruments',
      mainCategoryId: 16
    },{
      _id: 333,
      categoryName: 'Retail Office Equipment',
      mainCategoryId: 16
    },{
      _id: 334,
      categoryName: 'Retail Office Supplies and Gifts',
      mainCategoryId: 16
    },{
      _id: 335,
      categoryName: 'Retail Recyclable Materials & Used Merchandise',
      mainCategoryId: 16
    },
    {
      _id: 336,
      categoryName: 'Media & Telecommunications',
      mainCategoryId: 17
    },{
      _id: 337,
      categoryName: 'Book and Periodical Publishing',
      mainCategoryId: 336
    },{
      _id: 338,
      categoryName: 'Book Publishing',
      mainCategoryId: 337
    },{
      _id: 339,
      categoryName: 'Newspaper Publishing',
      mainCategoryId: 337
    },{
      _id: 340,
      categoryName: 'Periodical Publishing',
      mainCategoryId: 337
    },{
      _id: 341,
      categoryName: 'Broadcast Media Production and Distribution',
      mainCategoryId: 336
    },{
      _id: 342,
      categoryName: '	Cable and Satellite Programming',
      mainCategoryId: 341
    },{
      _id: 343,
      categoryName: 'Radio and Television Broadcasting',
      mainCategoryId: 341
    },{
      _id: 344,
      categoryName: 'Movies, Videos and Sound',
      mainCategoryId: 336
    },{
      _id: 345,
      categoryName: 'Animation and Post-production',
      mainCategoryId: 344
    },{
      _id: 346,
      categoryName: 'Media Production',
      mainCategoryId: 344
    },{
      _id: 347,
      categoryName: 'Movies and Sound Recording',
      mainCategoryId: 344
    },{
      _id: 348,
      categoryName: 'Sound Recording',
      mainCategoryId: 347
    },{
      _id: 349,
      categoryName: 'Sheet Music Publishing',
      mainCategoryId: 344
    },{
      _id: 350,
      categoryName: 'Telecommunications',
      mainCategoryId: 336
    },{
      _id: 351,
      categoryName: 'Satellite Telecommunications',
      mainCategoryId: 350
    },{
      _id: 352,
      categoryName: 'Telecommunications Carriers',
      mainCategoryId: 350
    },{
      _id: 353,
      categoryName: 'Wireless Services',
      mainCategoryId: 350
    },{
      _id: 354,
      categoryName: 'Technology, Information and Internet',
      mainCategoryId: 17
    },{
      _id: 355,
      categoryName: 'Data Infrastructure and Analytics',
      mainCategoryId: 354
    },{
      _id: 356,
      categoryName: 'Blockchain Services',
      mainCategoryId: 355
    },{
      _id: 357,
      categoryName: 'Business Intelligence Platforms',
      mainCategoryId: 355
    },{
      _id: 358,
      categoryName: '	Climate Data and Analytics',
      mainCategoryId: 355
    },{
      _id: 359,
      categoryName: 'Information Services',
      mainCategoryId: 354
    },{
      _id: 360,
      categoryName: 'Internet Publishing',
      mainCategoryId: 359
    },{
      _id: 361,
      categoryName: 'Business Content',
      mainCategoryId: 360
    },{
      _id: 362,
      categoryName: 'Online Audio and Video Media',
      mainCategoryId: 360
    },{
      _id: 363,
      categoryName: 'Internet News',
      mainCategoryId: 362
    },{
      _id: 364,
      categoryName: 'Libraries',
      mainCategoryId: 359
    },{
      _id: 365,
      categoryName: 'Blogs',
      mainCategoryId: 360
    },{
      _id: 366,
      categoryName: 'Internet Marketplace Platforms',
      mainCategoryId: 354
    },{
      _id: 367,
      categoryName: 'Social Networking Platforms',
      mainCategoryId: 354
    },{
      _id: 368,
      categoryName: 'Software Development',
      mainCategoryId: 354
    },{
      _id: 369,
      categoryName: 'Computer Games',
      mainCategoryId: 368
    },{
      _id: 370,
      categoryName: 'Mobile Gaming Apps',
      mainCategoryId: 369
    },{
      _id: 371,
      categoryName: 'Computer Networking Products',
      mainCategoryId: 368
    },{
      _id: 372,
      categoryName: 'Data Security Software Products',
      mainCategoryId: 368
    },{
      _id: 373,
      categoryName: 'Desktop Computing Software Products',
      mainCategoryId: 368
    },{
      _id: 374,
      categoryName: 'Embedded Software Products',
      mainCategoryId: 368
    },{
      _id: 375,
      categoryName: 'Mobile Computing Software Products',
      mainCategoryId: 368
    },{
      _id: 376,
      categoryName: 'Airlines and Aviation',
      mainCategoryId: 18
    },{
      _id: 377,
      categoryName: 'Freight and Package Transportation',
      mainCategoryId: 18
    },{
      _id: 378,
      categoryName: 'Ground Passenger Transportation',
      mainCategoryId: 18
    },{
      _id: 379,
      categoryName: 'Interurban and Rural Bus Services',
      mainCategoryId: 378
    },{
      _id: 380,
      categoryName: 'School and Employee Bus Services',
      mainCategoryId: 378
    },{
      _id: 381,
      categoryName: 'Shuttles and Special Needs Transportation Services',
      mainCategoryId: 378
    },{
      _id: 382,
      categoryName: 'Sightseeing Transportation',
      mainCategoryId: 378
    },{
      _id: 383,
      categoryName: 'Taxi and Limousine Services',
      mainCategoryId: 378
    },{
      _id: 384,
      categoryName: 'Urban Transit Services',
      mainCategoryId: 378
    },{
      _id: 385,
      categoryName: 'Maritime Transportation',
      mainCategoryId: 18
    },{
      _id: 386,
      categoryName: 'Pipeline Transportation',
      mainCategoryId: 18
    },{
      _id: 387,
      categoryName: 'Postal Services',
      mainCategoryId: 18
    },{
      _id: 388,
      categoryName: 'Rail Transportation',
      mainCategoryId: 18
    },{
      _id: 389,
      categoryName: 'Truck Transportation',
      mainCategoryId: 18
    },{
      _id: 390,
      categoryName: 'Warehousing and Storage',
      mainCategoryId: 18
    },{
      _id: 391,
      categoryName: 'Electric Power Generation',
      mainCategoryId: 19
    },{
      _id: 392,
      categoryName: 'Fossil Fuel Electric Power Generation',
      mainCategoryId: 391
    },{
      _id: 393,
      categoryName: 'Nuclear Electric Power Generation',
      mainCategoryId: 391
    },{
      _id: 394,
      categoryName: 'Renewable Energy Power Generation',
      mainCategoryId: 391
    },{
      _id: 395,
      categoryName: 'Biomass Electric Power Generation',
      mainCategoryId: 394
    },{
      _id: 396,
      categoryName: 'Geothermal Electric Power Generation',
      mainCategoryId: 394
    },{
      _id: 397,
      categoryName: 'Hydroelectric Power Generation',
      mainCategoryId: 394
    },{
      _id: 398,
      categoryName: 'Solar Electric Power Generation',
      mainCategoryId: 394
    },{
      _id: 399,
      categoryName: 'Wind Electric Power Generation',
      mainCategoryId: 394
    },{
      _id: 400,
      categoryName: 'Electric Power Transmission, Control, and Distribution',
      mainCategoryId: 19
    },{
      _id: 401,
      categoryName: 'Natural Gas Distribution',
      mainCategoryId: 19
    },{
      _id: 402,
      categoryName: 'Water, Waste, Steam, and Air Conditioning Services',
      mainCategoryId: 19
    },{
      _id: 403,
      categoryName: 'Steam and Air-Conditioning Supply',
      mainCategoryId: 402
    },{
      _id: 404,
      categoryName: 'Waste Collection',
      mainCategoryId: 402
    },{
      _id: 405,
      categoryName: 'Waste Treatment and Disposal',
      mainCategoryId: 402
    },{
      _id: 406,
      categoryName: 'Water Supply and Irrigation Systems',
      mainCategoryId: 402
    },{
      _id: 407,
      categoryName: 'Wholesale Alcoholic Beverages',
      mainCategoryId: 20
    },{
      _id: 408,
      categoryName: '	Wholesale Apparel and Sewing Supplies',
      mainCategoryId: 20
    },{
      _id: 409,
      categoryName: 'Wholesale Appliances, Electrical, and Electronics',
      mainCategoryId: 20
    },{
      _id: 410,
      categoryName: 'Wholesale Building Materials',
      mainCategoryId: 20
    },{
      _id: 411,
      categoryName: 'Wholesale Chemical and Allied Products',
      mainCategoryId: 20
    },{
      _id: 412,
      categoryName: 'Wholesale Computer Equipment',
      mainCategoryId: 20
    },{
      _id: 413,
      categoryName: 'Wholesale Drugs and Sundries',
      mainCategoryId: 20
    },{
      _id: 414,
      categoryName: 'Wholesale Food and Beverage',
      mainCategoryId: 20
    },{
      _id: 415,
      categoryName: 'Wholesale Footwear',
      mainCategoryId: 20
    },{
      _id: 416,
      categoryName: 'Wholesale Furniture and Home Furnishings',
      mainCategoryId: 20
    },{
      _id: 417,
      categoryName: 'Wholesale Hardware, Plumbing, Heating Equipment',
      mainCategoryId: 20
    },{
      _id: 418,
      categoryName: 'Wholesale Import and Export',
      mainCategoryId: 20
    },{
      _id: 419,
      categoryName: 'Wholesale Luxury Goods and Jewelry',
      mainCategoryId: 20
    },{
      _id: 420,
      categoryName: 'Wholesale Machinery',
      mainCategoryId: 20
    },{
      _id: 421,
      categoryName: 'Wholesale Metals and Minerals',
      mainCategoryId: 20
    },{
      _id: 422,
      categoryName: 'Wholesale Motor Vehicles and Parts',
      mainCategoryId: 20
    },{
      _id: 423,
      categoryName: 'Wholesale Paper Products',
      mainCategoryId: 20
    },{
      _id: 424,
      categoryName: 'Wholesale Petroleum and Petroleum Products',
      mainCategoryId: 20
    },{
      _id: 425,
      categoryName: 'Wholesale Photography Equipment and Supplies',
      mainCategoryId: 20
    },{
      _id: 426,
      categoryName: 'Wholesale Raw Farm Products',
      mainCategoryId: 20
    },{
      _id: 427,
      categoryName: '	Wholesale Recyclable Materials',
      mainCategoryId: 20
    },
  ]

    const seedLocationDB = async()=>{
      await Category.deleteMany({});
      await Category.insertMany(categories);
    }

    seedLocationDB();
 