const express = require("express");

// const UserRouter = require("../Components/User/website/UserRouter");
// const CompanyRouter = require("../Components/Companies/CompanyRouter");
// const CareersRouter = require("../Components/Careers/CareerRouter");

const {
  protect,
  authorized,
} = require("../Components/User/Website/Auth/AuthController");




















const Router = express.Router();
// Router.get("/routes", (req, res) => {
//   const routes = [
//     "categories",
//     "products",
//     "users",
//     "roles",
//     "employees",
//     "orders",
//     "settings",
//   ];
//   res.json({
//     message: "success",
//     data: {
//       routes,
//       // , ban: ["users", "employees"]
//     },
//   });
// });

// Router.use(protect);
// Router.use("/statics", StaticsRouter);
// Router.use("/customers-contact", ContactUsRouter);
// Router.use(authorized);
// Router.use("/users", EmployeeRouter);


module.exports = Router;