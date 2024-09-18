const express = require('express')
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/register',userController.register) //This is for register API 

router.post('/login',userController.login) // This is for Login API 

module.exports = router;