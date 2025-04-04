const Product = require('../models/Product');

const getStockData = async (req, res) => {
    try {
        let { category, sortBy, order } = req.query;
        let filter = {};
        let sortOptions = {};

        if (category) filter.category = category;
        if (sortBy) sortOptions[sortBy] = order === "desc" ? -1 : 1;

        const products = await Product.find(filter).sort(sortOptions);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stock data", error });
    }
};

const getChartData = async (req, res) => {
    try {
        const products = await Product.find();

        const categories = {};
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = { totalRevenue: 0, totalSold: 0 };
            }
            categories[product.category].totalRevenue += product.totalRevenue;
            categories[product.category].totalSold += product.itemsSold;
        });

        const chartData = Object.keys(categories).map(category => ({
            category,
            totalRevenue: categories[category].totalRevenue,
            totalSold: categories[category].totalSold
        }));

        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching chart data", error });
    }
};

module.exports = {
    getStockData,
    getChartData
};  