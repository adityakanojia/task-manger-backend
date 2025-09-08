const express = require('express');
const {registerHandler, loginUser} = require('../controllers/authenticationController.js')
const router = express.Router();


//Route for adding user
router.post('/api/register',registerHandler)
router.post('/api/login', loginUser);


module.exports = router;