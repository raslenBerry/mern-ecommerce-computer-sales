const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title : {type : String , required : true },
    description : {type : String  },
    image : {type : String , required : true} ,
    categories : {type : Array } ,
    price : {type : Number , required: true} ,
    brand : {type : String } ,
    inStock : {type : Boolean ,default: true } ,
  },
  {timestamps: true}
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
