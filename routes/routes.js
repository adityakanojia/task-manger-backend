const express = require('express');
const {registerHandler, loginUser} = require('../controllers/authenticationController.js')
const {getTasksHandler, addTaskHandler, deleteTaskHandler, editTaskHandler} = require('../controllers/tasksController.js')
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken.js')

//Route for adding user
router.post('/api/register',registerHandler)
router.post('/api/login', loginUser);

//Protected task routes
router.get('/api/tasks', authenticateToken, getTasksHandler);
router.post('/api/add-task', authenticateToken, addTaskHandler)
router.delete('/api/delete-task/:id', authenticateToken, deleteTaskHandler)
router.put('/api/update-task/:id', authenticateToken, editTaskHandler)

module.exports = router;