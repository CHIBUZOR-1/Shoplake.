const userModel = require('../models/users');

// Adding items to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user._id);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.user._id, {cartData});
        res.json({
            success: true,
            message: "Added to cart"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.user._id);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

        }
        await userModel.findByIdAndUpdate(req.user._id, {cartData});
        res.json({
            success: true,
            message: "Removed from cart"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

const getCartItems = async (req, res) => {
    try {
        let userData = await userModel.findById(req.user._id);
        const cart = userData.cartData;
        res.json({
            success: true,
            data: cart,
            message: "Retrieved"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Failed to retrieve cart data" 
        })
    }
}

module.exports = { addToCart, removeFromCart, getCartItems };