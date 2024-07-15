const app = require("./app");
const port = process.env.APP_PORT;
const setupDatabase = process.env.DB_AUTO_SETUP;

const databaseSetup = require("./utils/databaseSetup.util");

if (setupDatabase == "false") {
  console.log("starting the app without databaseSetup");
  app.listen(port, () => {
    console.log(`Currently running at port http://localhost:${port}`);
  });
} else {
  databaseSetup()
    .then(() => {
      app.listen(port, () => {
        console.log(`Currently running at port http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to set up database:", err);
      process.exit(1);
    });
}
