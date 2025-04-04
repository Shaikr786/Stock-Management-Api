const express = require("express");
const { stockOverview } = require("../controllers/stockController");
const {protect, adminOnly} = require("../middleware/authMiddleware");

const router = express.Router();
// Get stock overview (total items sold and revenue)
router.get("/stock-overview", protect, adminOnly, stockOverview);

module.exports = router;
