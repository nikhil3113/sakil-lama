const express = require('express');
const router = express.Router();
const subProjectController = require('../controller/subProjectController');
const auth = require('../middleware/auth');

router.post('/:projectId', auth, subProjectController.createSubProject)
router.get('/:projectId', auth, subProjectController.getsubPRojectByProjectId)
router.get('/get/:id', auth, subProjectController.getSubProjectById)
router.put("/edit/:id", auth, subProjectController.editSubProject)
router.delete("/delete/:id", auth, subProjectController.deleteSubProject)

module.exports = router;