const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {
  //update
  updateUser: async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      const userId = req.params.id;
      const newData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      res.send(updatedUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteUser : async(req,res)=>{
    try {
      userId = req.params.id ;
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(200).send(deletedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getUserById : async(req,res)=>{
    try {
      const userFound = await User.findById(req.params.id);
      res.status(200).send(userFound);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getAllUsers : async(req,res)=>{
    const query = req.query.new;
    try {
      const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  userStats : async(req, res) => {
    const date = new Date() ;
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
      const data = await User.aggregate([
        {$match : {createdAt : {$gte : lastYear}}},
        {
          $project : {
            month : {$month : "$createdAt" }
          }
        },
        {
          $group : {
            _id : "$month",
            total : {$sum : 1},
          }
        }
      ]);
      res.status(200).send(data) ;
      
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

module.exports= userController ;