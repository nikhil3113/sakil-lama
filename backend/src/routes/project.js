const express = require('express');
const projectController = require('../controller/projectController');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/', auth, projectController.createProject);
router.get('/', auth, projectController.getProjects);
module.exports = router;
