require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwt_secret_key = process.env.JWT_SECRET_KEY;

function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    //bearer token
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) res.status(403).send("no token found")
    
    jwt.verify(token, jwt_secret_key, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = { id: decoded.id, username: decoded.username };
        next();
    });
} 

module.exports = authenticateToken;