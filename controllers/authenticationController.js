const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config()

const jwt_secret_key = process.env.JWT_SECRET_KEY;

const registerHandler = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        const user = await User.findOne({username});

        if(user) return res.status(400).send("User already exist")
    
        const newUser = await User.create({name, username, password});     
        
        const token = jwt.sign({id: newUser._id, username: newUser.username},jwt_secret_key,{expiresIn: "1d"})
        
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


module.exports = {registerHandler}