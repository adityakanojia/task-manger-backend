const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config()

const jwt_secret_key = process.env.JWT_SECRET_KEY;


// Registering a user
const registerHandler = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        const user = await User.findOne({username});

        if(user) return res.status(400).send("User already exist") // will handle the validation in frontend
    
        const newUser = await User.create({name, username, password});     
        
        const token = jwt.sign({id: newUser._id, username: newUser.username},jwt_secret_key,{expiresIn: "1d"})
        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=${60*60*24}`
        );
        return res.status(200).json({
            message: "authenticated Successfully",
            user: {id: newUser._id,
                name: newUser.name,
                username: newUser.username
            },
            token
        });   
    
    } catch (error) {
        console.log(error)
        res.status(500).send("server error");
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
    
        if(!user) return res.status(400).send("Invalid credentials");

        const comparingHashedPassword = await bcrypt.compare(password, user.password);
        if(!comparingHashedPassword) return res.status(400).send("Invalid credentials");
        
        const token = jwt.sign({id: user._id, username: user.username}, jwt_secret_key, {expiresIn : "1d"});

        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; Max-Age=${60*60*24}`
        );

        return res.status(200).json({
            message : "logged is succesfully",
            token
        });

    } catch (error) {
        res.status(500).send("server error");
    }  
}

module.exports = { registerHandler, loginUser }