const express = require("express");
const { createUser, updateUser } = require("../controllers/userController");
const Router = express.Router();
Router.route("/").post(createUser);
Router.route("/:id").patch(updateUser);
module.exports = Router;
