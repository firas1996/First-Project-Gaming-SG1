const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
  signUp,
} = require("../controllers/userController");
const Router = express.Router();
Router.route("/signup").post(signUp);
Router.route("/").get(getUsers).post(createUser);
Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = Router;
