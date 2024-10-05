const router = require('express').Router();
const verifyToken = require('../contollers/verifyTokenController');
const productController = require('../contollers/productContoller');

//createProduct 
router.post('/addProduct' , verifyToken.verifyTokenAndAdmin , productController.createProduct);

//updateProduct 
router.put('/updateProduct/:id' , verifyToken.verifyTokenAndAdmin , productController.updateProduct);

//deleteProduct 
router.delete('/deleteProduct/:id' , verifyToken.verifyTokenAndAdmin , productController.deleteProduct)

//getProductById 
router.get('/find/:id' , productController.getProductById);

//getAllProducts 
router.get('/' , productController.getAllProducts);

module.exports = router ;