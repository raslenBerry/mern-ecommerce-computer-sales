const router = require('express').Router();
const verifyTokenController = require('../contollers/verifyTokenController');
const userController = require('../contollers/userController');

//updateUser
router.put("/updateUser/:id" , verifyTokenController.verifyTokenAndAuth , userController.updateUser);

//deleteUser
router.delete("/deleteUser/:id" , verifyTokenController.verifyTokenAndAdmin , userController.deleteUser);

//getUserById 
router.get("/getUserById/:id" , verifyTokenController.verifyTokenAndAdmin , userController.getUserById);

//getAllUsers
router.get("/getAllUsers" , verifyTokenController.verifyTokenAndAdmin , userController.getAllUsers);

//userStats
router.get("/userStats" , verifyTokenController.verifyTokenAndAdmin , userController.userStats);




module.exports = router ;