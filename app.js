const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const institutionRoutes = require("./routes/institution.routes");
const superAdminRoutes = require("./routes/superAdmin.routes");
const categoryRoutes = require("./routes/category.routes");
const reportRoutes = require("./routes/reports.routes");
const reportResponseRoutes = require("./routes/reportResponse.routes");
const reportResultRoutes = require("./routes/reportResult.routes");
const sameReporterRoutes = require("./routes/sameReporter.routes");
const chartRoutes = require("./routes/chart.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reportResponses", reportResponseRoutes);
app.use("/api/reportResults", reportResultRoutes);
app.use("/api/sameReporter", sameReporterRoutes);
app.use("/api/charts", chartRoutes);

app.get("/", (req, res) => {
  res.send("The app is running!");
});

module.exports = app;
