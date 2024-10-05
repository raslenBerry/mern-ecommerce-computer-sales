const express = require('express');
const cors = require('cors'); 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const commandRoute = require('./routes/command');
const stripeRoute = require('./routes/stripe');
require('dotenv').config();
require('./config/connect');

const app = express();

app.use(cors());

app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/command', commandRoute);
app.use('/api/checkout', stripeRoute);




app.listen(3000, () => {
  console.log('server work');
});
