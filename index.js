const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();

const route = require('./routes/authenticationRoutes.js')

const port = process.env.PORT || 3000;
const connectionString = process.env.DB_CONNECTION_STRING;

app.use(express.json())

app.use("/",route)

mongoose.connect(connectionString).then(() => {
    console.log("connected to database");
    app.listen(port, () => console.log("server started"));
})