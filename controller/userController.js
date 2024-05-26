const { pool } = require("../database/connection");
const bcrypt = require("bcrypt");
const {generateToken} = require("../middleware/authenticaton");

const userRegistration = async(req,res) =>{
    try{

        const { user_name,user_email,user_password,user_role } = req.body;

        const alreadyRegistered = await pool.query("SELECT * FROM Users WHERE user_email=$1",[user_email]);
        if(alreadyRegistered.rows.length > 0){
            return res.status(400).json({msg:"user with this email already exists"});
        }

        const hashedPassword = await bcrypt.hash(user_password,10);

        const user = await pool.query("INSERT INTO Users(user_name,user_email,user_password,user_role) VALUES ($1,$2,$3,$4) RETURNING *",[user_name,user_email,hashedPassword,user_role]);
        console.log("user is ",user.rows[0]);
        return res.status(200).json(user.rows[0]);

    }catch(error){
        console.log("Error Occured in Registration",error);
        return res.status(500).json({msg:"Error While Registering user"});
    }
}


const userLogin = async(req,res) =>{
    try{

        const useremail=req.body.user_email;
        const userpassword =req.body.user_password;

        const isRegistered = await pool.query("SELECT * FROM Users WHERE user_email=$1",[useremail]);

        if(isRegistered.rows.length!==1){
            return res.status(401).json({msg:"User is not registered"});
        }

        const {user_id,user_email,user_role,user_password} = isRegistered.rows[0];
        console.log("registered user",isRegistered.rows[0])

        const isCorrectPassword = await bcrypt.compare(userpassword,user_password);

        if(!isCorrectPassword){
            return res.status(400).json({msg:"Invalid Credentials!!"});
        }
        const token = generateToken({user_id,user_email,user_role});
        return res.status(200).json({token});

    }catch(error){
        console.log("Error While Logining user",user);
    }
}


module.exports ={
    userRegistration,
    userLogin
}