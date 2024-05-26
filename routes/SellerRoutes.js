const express = require("express");
const multer = require('multer');
const Router = express.Router();
const { addBook,updateBook,deleteBook, getBook, getAllBooks, addMultipleBook } = require("../controller/sellerController")
const {validateBookDetails} = require("../middleware/validation");
const {verifyToken} = require("../middleware/authenticaton");

const upload = multer({ dest: 'uploads/' });

Router.post("/addBook",verifyToken,validateBookDetails,addBook);
Router.post("/addMultipleBook",verifyToken,upload.single('books'),addMultipleBook);
Router.put("/updateBook",verifyToken,validateBookDetails,updateBook);
Router.delete("/deleteBook",verifyToken,deleteBook)
Router.get("/getBook/:title",verifyToken,getBook);
Router.get("/getAllBooks",verifyToken,getAllBooks)

module.exports = Router