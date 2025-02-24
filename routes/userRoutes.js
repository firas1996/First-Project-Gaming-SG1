const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const Router = express.Router();
Router.route("/").get(getUsers).post(createUser);
Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = Router;
