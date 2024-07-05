const express = require("express");
const morgan = require("morgan");
const chartRoute = require("./routes/chart.route");
const sameReporterRoute = require("./routes/sameReporter.route");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", chartRoute);
app.use("/api", sameReporterRoute);

module.exports = app;
