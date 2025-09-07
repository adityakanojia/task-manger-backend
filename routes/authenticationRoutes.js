const express = require('express');
const {registerHandler} = require('../controllers/authenticationController.js')
const router = express.Router();


//Route for adding user
router.post('/api/register',registerHandler)

module.exports = router;