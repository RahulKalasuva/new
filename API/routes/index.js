// Initialize router
const express = require('express');
const router = express.Router();

// Controller
const todolist = require('../controllers/todolist');

// Routes
const Projectsroutes = require('./Projectsroutes')
const Taskroutes = require('./Tasklistroutes')
const Tasklibraryroutes = require('./Tasklibraryroutes')

// Todolistroutes
router.get('/todolist', todolist.getTodo);


// Projectsroutes
router.use('/projects', Projectsroutes)


// Taskroutes
router.use('/task', Taskroutes)

// Module Export 
module.exports = router;
