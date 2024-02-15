const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const hpp = require("hpp");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");

//Middlewares
const { _404, _500 } = require("./Middlewares/errorsWare");

//Routers
const DashboardRouter = require("./Routes/Dashboard");

// const AuthRouter = require("./Components/Companies/Auth/AuthRouter");
const UserAuthRouter = require("./Components/User/Website/Auth/AuthRouter");
const myProfileRouter = require("./Components/User/Website/UserRouter");
const CountryRouter = require("./Components/Locations/Country/CountryRouter");
const DistrictRouter = require("./Components/Locations/District/DistrictRouter");
const jobCategoryRouter = require("./Components/JobRelatedEntites/JobCategory/JobCategoryRouter");
const userSkillRouter = require("./Components/UserRelatedEntities/UserSkill/userSkillRouter");
const userExperienceRouter = require("./Components/UserRelatedEntities/UserExperience/userExperienceRouter");
const userEducationRouter = require("./Components/UserRelatedEntities/UserEducation/userEducationRouter");
const userCourseRouter = require("./Components/UserRelatedEntities/UserCourse/userCourseRouter");
const userResumeRouter = require("./Components/UserRelatedEntities/UserResume/userResumeRouter");
const userCompanyRouter = require("./Components/Companies/CompanyRouter");
const userCompanyJobRouter = require("./Components/Job/JobRouter");
const jobApplicationRouter = require("./Components/JobRelatedEntites/JobApplicant/JobApplicantRouter");


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});


const app = express();
app.use(
  hpp({
    // whitelist: ["", "status", "is_active"],
  })
);

const v1Router = express.Router();
// MiddleWares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // log the URL
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.env.PUBLIC_FOLDER || "public"));
app.use(limiter);
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
    },
  })
);


// // Dashboard

// app.use("/admin", AuthRouter); // Auth Routes
// app.use("/api/v1", v1Router); // versioning Routes
// v1Router.use(DashboardRouter); // Dashboard Routes

// // Website Routes

app.use("/", UserAuthRouter); 
app.use("/myProfile", myProfileRouter); 
app.use("/country", CountryRouter); 
app.use("/district", DistrictRouter);
app.use("/jobCategory", jobCategoryRouter); 
app.use("/userSkill", userSkillRouter); 
app.use("/userExperience", userExperienceRouter); 
app.use("/userEducation", userEducationRouter); 
app.use("/userCourse", userCourseRouter); 
app.use("/userResume", userResumeRouter); 
app.use("/recruiterCompany", userCompanyRouter); 
app.use("/jobApplication", jobApplicationRouter); 
app.use("/companyJobs", userCompanyJobRouter); 
// app.use("/AllJobs", userCompanyJobRouter.getAllJobs); 


// // Error Handlers

app.use(_404); // Not Found Handlers
app.use(_500); // Error Handler

module.exports = app;