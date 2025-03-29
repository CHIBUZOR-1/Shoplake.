const express = require('express');
const { verifyToken, isAdmin } = require('../utils/authHelper');
const { braintreeTokenController, braintreePaymentController, userOrders, allOrders, updateStatus } = require('../controllers/OrderController');
const orderRouter = express.Router();

orderRouter.get('/braintree/token', braintreeTokenController);
orderRouter.post('/braintree/payment', verifyToken, braintreePaymentController);
orderRouter.post('/user_orders', verifyToken, userOrders); 
orderRouter.get('/all_orders', verifyToken, isAdmin, allOrders);
orderRouter.post('/status', verifyToken, updateStatus);

module.exports = orderRouter;