const express = require("express");
const port = 3500;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./middleware/middleware");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server Running in http://localhost:${port}`);
});

// Middleware
app
  .use(middleware.errorHandler)
  .use(middleware.logRequestTime)
  .use(middleware.authenticate)
  .use(middleware.notFound)
  .use(middleware.dataNotFound)
  .use(middleware.handleServerError);

module.exports = app;
