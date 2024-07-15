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

module.exports = app;
