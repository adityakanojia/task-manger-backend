const express = require('express')

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/',(req,res) => {
    res.send("<h1>yo man</h1>")
})

app.listen(port,() => console.log("tasks here"))