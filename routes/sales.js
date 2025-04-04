const express = require("express");
const { sellProduct } = require("../controllers/productController");

const router = express.Router();

// Endpoint to handle sales
router.post("/sell", sellProduct);

module.exports = router;
