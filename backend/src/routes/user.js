const express = require('express');
const userController = require("../controller/userController")
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/', auth, userController.getUser)
router.put('/update', auth, userController.updateUsername)

module.exports = router;
