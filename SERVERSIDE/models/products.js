const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;