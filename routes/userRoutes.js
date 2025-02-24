const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const Router = express.Router();
Router.route("/").post(createUser);
Router.route("/").get(getUsers);
Router.route("/:id").get(getUser);
Router.route("/:id").patch(updateUser);
Router.route("/:id").delete(deleteUser);
module.exports = Router;
