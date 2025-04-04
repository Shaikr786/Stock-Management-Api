// Import necessary modules
const Product = require('../models/Product');

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, category, price, quantityInStock } = req.body;

        
        const product = new Product({ name, category, price, quantityInStock, itemsSold: 0 });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
        console.log('Product added:', product); // Debugging line
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

// Fetch all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// // Fetch stock data
// const getStock = async (req, res) => {
//     try {
//         const products = await Product.find();
//         let totalItems = 0;
//         let totalSold = 0;
//         let totalRevenue = 0;

//         products.forEach(product => {
//             totalItems += product.quantityInStock;
//             totalSold += product.itemsSold;
//             totalRevenue += product.itemsSold * product.price;
//         });

//         res.status(200).json({ totalItems, totalSold, totalRevenue });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching stock data', error });
//     }
// };



// Sell Product and Update Stock
const sellProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body; // Get product ID and quantity from request

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Prevent sales if stock is insufficient
        if (product.quantityInStock < quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }

        // Update stock and sales details
        product.quantityInStock -= quantity; // Reduce stock
        product.itemsSold += quantity; // Increase total items sold
        product.totalRevenue += quantity * product.price; // Calculate revenue

        // Save updated product details
        await product.save();

        // Check if stock is low and send an alert (For example, if stock < 5)
        if (product.quantityInStock < 5) {
            console.log(`⚠️ Alert: Stock for ${product.name} is low! Only ${product.quantityInStock} left.`);
            // You can also trigger an email or notification system here
        }

        res.status(200).json({
            message: "Sale successful",
            updatedProduct: product
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Export the functions
module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    
    sellProduct,
    
};