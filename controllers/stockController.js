const Product = require('../models/Product');


// Fetch stock overview (total items sold and revenue)

// const stockOverview = async (req, res) => {
//     try {
//         const products = await Product.find();

//         const totalItemsSold = products.reduce((sum, p) => sum + p.itemsSold, 0);
//         const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0);

//         return res.status(200).json({
//             totalItemsSold,
//             totalRevenue,
//             products,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

const stockOverview = async (req, res) => {
    try {
        console.log("Stock overview API called"); // Debug log

        const products = await Product.find(); // Fetch all products

        let totalItems = 0;
        let totalSold = 0;
        let totalRevenue = 0;
        let soldItems = [];

        products.forEach(product => {
            const quantityInStock = Number(product.quantityInStock) || 0;
            const itemsSold = Number(product.itemsSold) || 0;
            const totalRevenueGenerated = Number(product.totalRevenue) || 0;

            totalItems += quantityInStock;
            totalSold += itemsSold;
            totalRevenue += totalRevenueGenerated;

            if (itemsSold > 0) { // Ensure condition is met
                soldItems.push({
                    name: product.name,
                    category: product.category,
                    quantitySold: itemsSold,
                    revenueGenerated: totalRevenueGenerated
                });
            }
        });

        res.status(200).json({
            totalItems,
            totalSold,
            totalRevenue,
            soldItems
        });
    } catch (error) {
        console.error("Stock Overview Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    stockOverview
};