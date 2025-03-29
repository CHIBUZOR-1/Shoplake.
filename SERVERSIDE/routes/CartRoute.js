const express = require('express');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/CartController');
const { verifyToken } = require('../utils/authHelper');

const cartRouter = express.Router();

cartRouter.post('/add',verifyToken, addToCart);
cartRouter.post('/remove', verifyToken, removeFromCart);
cartRouter.get('/cart', verifyToken, getCartItems);

module.exports = cartRouter;