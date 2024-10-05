const Cart = require('../models/cart');


const cartController = {
createCart : async(req,res)=>{
    const data = req.body ;
    const newCart = new Cart(data);
    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (error) {
        res.status(500).send(error);
    }
},

updateCart : async(req,res)=>{
    const cartId = req.params.id;
    const data = req.body ;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId , data , {new : true});
        res.status(200).send(updatedCart);
    } catch (error) {
        res.status(500).send(error);
    }
},
deleteCart : async(req,res)=>{
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedCart);
    } catch (error) {
        res.status(500).send(error);

    }
},
getCartByUserId : async(req,res)=>{
    try {
      const cart = await Cart.find({userId : req.params.userId});
      res.status(200).send(cart);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllCarts : async(req,res)=>{
   try {
    const carts = await Cart.find();
    res.status(200).send(carts);
   } catch (error) {
    res.status(500).send(error);
   }
  },


}


module.exports = cartController ;