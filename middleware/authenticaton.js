const JWT = require("jsonwebtoken")
const dotenv = require("dotenv").config();

const generateToken = (data) => {

    const {JWT_SECRETE_KEY} = process.env
    const token =  JWT.sign(data,JWT_SECRETE_KEY,{expiresIn:'50m'});
    return token;
}

const verifyToken = async (req,res,next) =>{

    const {JWT_SECRETE_KEY} = process.env;
    const bearerToken = req.headers.authorization;

    const token = bearerToken && bearerToken.split(" ")[1];
    
    if(!token){
        return res.status(400).json({msg:"Provide a valid token by loging in again!"});
    }
    let userDetails;
    try{
         userDetails = JWT.verify(token,JWT_SECRETE_KEY);
    }catch(error){
        return res.status(400).json({msg:"Invalid Token"})
    }

    req.user = userDetails.user_email;
    req.userrole=userDetails.user_role;
    next();

}

module.exports ={
    generateToken,
    verifyToken
}