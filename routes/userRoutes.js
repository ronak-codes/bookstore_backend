const express = require("express");
const Router = express.Router();
const { userRegistration, userLogin } = require("../controller/userController")
const {validateUserRegistration,validateUserLogin} = require("../middleware/validation")


Router.post("/registration",validateUserRegistration,userRegistration);
Router.post("/login",validateUserLogin,userLogin);


module.exports = Router;