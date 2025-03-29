const braintree = require('braintree');
const orderModel = require('../models/orders');
const userModel = require('../models/users')
const productModel = require('../models/products')
const dotenv = require("dotenv");

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANTID,
    publicKey: process.env.BRAINTREE_PUBLICKEY,
    privateKey: process.env.BRAINTREE_PRIVATEKEY
})

// Client Token generator
const braintreeTokenController = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(err, response) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// Payment controller
const braintreePaymentController = async(req, res) => {
    try {
        const {cart, nonce, amount, address} = req.body;
        let total = 0;
        cart.map((a)=> {
            total += a.new_price
        });

        gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            },
        },

        async function (err, result) {
            if(result) {
                const order = await new orderModel({
                    userId: req.user._id,
                    products: cart,
                    amount: amount,
                    address: address,
                    payment: result
                }).save()
                // Update the product quantities
                for (const product of cart) {
                    await productModel.findByIdAndUpdate(
                        product._id,
                        { $inc: { quantity: -product.quantity } }, // Decrease the quantity
                        { new: true }
                    );
                }

                // Clear user's cart data
                await userModel.findByIdAndUpdate(req.user._id, {cartData: {}});
                res.json({
                    success: true
                })
            } else {
                res.status(500).send(error)
            }
        }
    
    );
        
    } catch (error) {
        console.log(error);
    }
}

// user Orders 

const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({userId:req.user._id});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "An error occured!"
        })
    }
}
// Admin All orders
const allOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        const totalOrders = await orderModel.countDocuments({});
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthOrders = await orderModel.countDocuments({
            ...{},
            createdAt: { $gte: oneMonthAgo },
        });
        res.json({
            success: true,
            data: orders,
            totalOrders,
            lastMonthOrders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "An error occured!"
        })
    }
}

// Updating order status 
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status}, {new: true});
        res.json({
            success: true,
            message: "Order status changed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success: false,
            message: "Error Occured!"
        })
    }
}

module.exports = { braintreeTokenController, braintreePaymentController, userOrders, allOrders, updateStatus };