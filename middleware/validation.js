const { userRegistration, userLogin ,addBook} = require("./inputFormat");

const validateUserRegistration = (req,res,next) =>{
    console.log("validate")
    const {error,value} = userRegistration.validate(req.body);
    if(error){
        return res.status(400).json({msg:"Error while validating user registration"});
    }
    next();
}

const validateUserLogin = (req,res,next) =>{
    const {error,value} = userLogin.validate(req.body);
    if(error){
        return res.status(400).json({msg:"Error while validating user login"});
    }
    next();
}

const validateBookDetails = (req,res,next) =>{
    const {error,value} = addBook.validate(req.body);
    if(error){
        return res.status(400).json({msg:"Error while validating add boook\n"+error});
    }
    next();
}

module.exports={
    validateUserRegistration,
    validateUserLogin,
    validateBookDetails
}