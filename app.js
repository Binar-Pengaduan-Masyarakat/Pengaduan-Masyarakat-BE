const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const chartRoute = require("./routes/chart.route");
const sameReporterRoute = require("./routes/sameReporter.route");
require("dotenv").config();
const categoryRouter = require("./routes/category");
const superAdminRouter = require("./routes/superAdmin");
const reports = require("./routes/reports");
const reportResponse = require("./routes/reportRespons.route");
const reportResult = require("./routes/reportResult");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const institutionRoutes = require("./routes/institutionRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/category", categoryRouter);
app.use("/superAdmin", superAdminRouter);
app.use("/api", chartRoute);
app.use("/api", sameReporterRoute);
app.use("/reports", reports);
app.use("/respon", reportResponse);
app.use("/result", reportResult);

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a root route
app.get("/", (req, res) => {
  res.send("Welcome to the User Profile App");
});

// Use user routes for endpoints starting with /users
app.use("/users", userRoutes);

// Use institution routes for endpoints starting with /institutions
app.use("/institutions", institutionRoutes);

module.exports = app;
