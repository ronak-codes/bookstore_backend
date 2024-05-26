const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const BuyerRoutes = require("./routes/BuyerRoutes");
const SellerRoutes = require("./routes/SellerRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user",userRoutes);
app.use("/sellers",SellerRoutes);
app.use("/buyers",BuyerRoutes)


app.listen(PORT,()=> console.log(`Server started at port number ${PORT}`));
