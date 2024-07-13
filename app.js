const express = require("express");
const morgan = require("morgan");
const chartRoute = require("./routes/chart.route");
const sameReporterRoute = require("./routes/sameReporter.route");
require("dotenv").config();
const categoryRouter = require("./routes/category");
const superAdminRouter = require("./routes/superAdmin");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/category', categoryRouter);
app.use("/superAdmin", superAdminRouter)
app.use("/api", chartRoute);
app.use("/api", sameReporterRoute);

module.exports = app;
