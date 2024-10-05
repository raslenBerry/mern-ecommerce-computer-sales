const Product = require('../models/product');


const productController = {
createProduct : async(req,res)=>{
    const data = req.body ;
    const newProduct = new Product(data);
    try {
      console.log('Request Body:', req.body);
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct);
        
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
},
updateProduct : async(req,res)=>{
    const productId = req.params.id;
    const data = req.body ;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId , data , {new : true});
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send(error);
    }
},
deleteProduct : async(req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedProduct);
    } catch (error) {
        res.status(500).send(error);

    }
},
getProductById : async(req,res)=>{
    try {
      const prod = await Product.findById(req.params.id);
      res.status(200).send(prod);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllProducts : async(req,res)=>{
    const qNew = req.query.new ;
    const qCategory = req.query.category;
    try {
      let products ;
      if(qNew){
        products = await Product.find().sort({createdAt : -1}).limit(1);
      }else if(qCategory){
        products = await Product.find({
            categories: {
            $in : [qCategory],
            },
        });
        }else{
            products = await Product.find();
        }
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send(error);
    }
  },


}


module.exports = productController ;