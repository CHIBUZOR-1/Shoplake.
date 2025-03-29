const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Order Processing",
        enum: ["Not Processed", "shipped", "Order Processing", "Delivered"]
    },
    payment: {
        type: Object
    }
}, {
    timestamps: true
});

const orderModel = mongoose.model('Orders', orderSchema);

module.exports = orderModel;