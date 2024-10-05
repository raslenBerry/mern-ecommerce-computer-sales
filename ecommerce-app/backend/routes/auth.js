const express = require('express');
const router = express.Router();
const authController = require('../contollers/authController');


//register
router.post('/register' , authController.register) ;

//login
router.post('/login' , authController.login) ;


module.exports = router ;