const express = require("express");
const { getBook,getAllBooks } = require("../controller/buyerController");
const { verifyToken } = require("../middleware/authenticaton");
const Router = express.Router();

Router.get("/getAllBooks",verifyToken,getAllBooks);
Router.get("/getBook",verifyToken,getBook);

module.exports = Router
