const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
} = require("../controllers/userController");
const Router = express.Router();
Router.route("/").post(createUser);
Router.route("/").get(getUsers);
Router.route("/:id").patch(updateUser);
module.exports = Router;
