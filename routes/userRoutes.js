const express = require("express");
const { createUser } = require("../controllers/userController");
const Router = express.Router();
Router.route("/").post(createUser);
module.exports = Router;
