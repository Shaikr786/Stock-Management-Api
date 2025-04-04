const express = require('express');
const { getStockData, getChartData } = require('../controllers/analyticsController');

const router = express.Router();
router.get('/stock', getStockData);

router.get('/chart-data', getChartData);


module.exports = router;
