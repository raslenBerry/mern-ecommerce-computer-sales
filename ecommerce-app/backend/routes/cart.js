const router = require('express').Router();
const verifyToken = require('../contollers/verifyTokenController');
const cartController = require('../contollers/cartController');

//createCart 
router.post('/createCart' , verifyToken.verifyToken ,cartController.createCart);

//updateCart 
router.put('/updateCart/:id' , verifyToken.verifyTokenAndAuth ,cartController.updateCart);

//deleteCart 
router.delete('/deleteCart/:id' , verifyToken.verifyTokenAndAuth ,cartController.deleteCart)

//getCartByUserId 
router.get('/getCartById/:userId', verifyToken.verifyTokenAndAuth ,cartController.getCartByUserId);

//getAllCarts 
router.get('/getAllCarts',verifyToken.verifyTokenAndAdmin ,cartController.getAllCarts);

module.exports = router ;