const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {
    //register
  register : async(req , res)=>{
   try {
    console.log(req.body);
     const data = req.body ;
     const newUser = new User(data);
     const salt = bcrypt.genSaltSync(10);
     const cryptedPassword = await bcrypt.hashSync(data.password , salt);
     newUser.password = cryptedPassword;
     const savedUser = await newUser.save();
     res.status(200).send(savedUser);
   } catch (error) {
    res.status(500).send(error);
   }
  },
  //login
 login: async (req, res) => {
    try {
      const data = req.body;
      const user = await User.findOne({ email: data.email });
      if (!user) {
        res.status(404).send('Email or password invalid');
      } else {
        const validPass = bcrypt.compareSync(data.password, user.password);
        if (!validPass) {
          res.status(401).send('Email or password invalid');
        } else {
          const payload = {
            _id: user._id,
            isAdmin : user.isAdmin
          };
          const token = jwt.sign(payload, process.env.JWT_SEC , {expiresIn:"3d"});
          res.status(200).send({ user ,  mytoken: token  });
        }
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = authController ;