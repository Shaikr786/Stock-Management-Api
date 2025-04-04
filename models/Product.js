const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    
    name: { type: String, required: true },

    category: { type: String, required: true },

    price: { type: Number, required: true },

    quantityInStock: { type: Number, required: true, default: 0 },// Available stock

    itemsSold: { type: Number, default: 0 },  // Number of items sold

    totalRevenue: { type: Number, default: 0 },  // Total revenue generated

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


