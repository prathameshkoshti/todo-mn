const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(error);
  process.exit(1);
});

const databaseURI = process.env.DB_HOST.replace(
  "<password>",
  process.env.DB_PASSWORD,
);

mongoose
  .connect(databaseURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connection established.");
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED EXCEPTION! Shutting down...");
  console.log(error);
  process.exit(1);
});
