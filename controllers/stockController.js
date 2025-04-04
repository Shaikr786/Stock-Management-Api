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
        console.log("Stock overview API called"); // 1️⃣ Check if API is called

        const products = await Product.find(); // Fetch all products
       
        let totalItems = 0;
        let totalSold = 0;
        let totalRevenue = 0;
        let soldItems = [];

        products.forEach(product => {
            totalItems += product.quantityInStock || 0;
            totalSold += product.itemsSold || 0;
            totalRevenue += product.totalRevenue || 0;

            if (product.itemsSold && product.itemsSold > 0) { // 3️⃣ Ensure condition is met
                soldItems.push({
                    name: product.name,
                    category: product.category,
                    quantitySold: product.itemsSold,
                    revenueGenerated: product.totalRevenue
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