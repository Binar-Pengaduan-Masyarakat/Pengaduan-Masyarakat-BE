const express = require("express");
const morgan = require("morgan");
const chartRoute = require("./routes/chart.route");
const sameReporterRoute = require("./routes/sameReporter.route");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(chartRoute);
app.use(sameReporterRoute);

app.listen(port, () => console.log(`currently running at port ${port}`));
