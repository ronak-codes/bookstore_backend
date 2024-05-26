const Joi = require("joi");

const userRegistration = Joi.object({
    user_name:Joi.string().min(3).required(),
    user_email:Joi.string().email().required(),
    user_password:Joi.string().min(6).required(),
    user_role:Joi.string().valid("buyer","seller").required()
})


const userLogin = Joi.object({
    user_email:Joi.string().email().required(),
    user_password:Joi.string().min(6).required(),
    user_role:Joi.string().required()
})

const addBook = Joi.object({
    title:Joi.string().required(),
    author:Joi.string().required(),
    publishedDate:Joi.date().iso().required(),
    price:Joi.string().required(),
    seller_id:Joi.string().required()
})

module.exports ={
    userRegistration,
    userLogin,
    addBook
}