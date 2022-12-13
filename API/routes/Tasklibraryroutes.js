// Initialize router
const express = require('express')
const router = express.Router()

// Controller
const ProjectController = require('../controllers/projectcontroller')


// Initialize routes
router.route('/')
      .get(ProjectController.getProjects)

// Module Exports
module.exports = router
