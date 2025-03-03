const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
  signUp,
  signIn,
} = require("../controllers/userController");
const Router = express.Router();
Router.route("/signup").post(signUp);
Router.route("/signin").post(signIn);
Router.route("/").get(getUsers).post(createUser);
Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = Router;
