const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // IMPORT MIDDLEWARE

const router = express.Router();

// Protect ALL routes in this file
router.route('/')
    .get(protect, getTasks)  // Now requires a token
    .post(protect, createTask); // Now requires a token

router.route('/:id')
    .put(protect, updateTask)    // Now requires a token
    .delete(protect, deleteTask); // Now requires a token

module.exports = router;