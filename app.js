const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
dotenv.config({ path: "./.env" });
const app = express();
app.use("/user", userRouter);
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection secured !!!");
  })
  .catch((e) => {
    console.log(e);
  });
const port = 1234;

app.listen(port, () => {
  try {
    console.log("Server is running !!!!");
  } catch (error) {
    console.log(error);
  }
});
