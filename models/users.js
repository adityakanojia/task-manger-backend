const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

//uSER MODEL SCHEMA
const userSchema = new Schema({
    name: {
        type: String,
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});

//HASHING PASSWORD BEFORE SAVING THE DOCUMENT JUST TO WRITE SOME CLEAN CODE
userSchema.pre("save",async function(next){
    if(this.isModified("password")) {
        const salt = 10;
        this.password = await bcrypt.hash(this.password,salt); 
    };
    next();
})

module.exports = mongoose.model("User",userSchema)