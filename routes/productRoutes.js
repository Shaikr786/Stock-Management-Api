const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct, getStock } = require('../controllers/productController');
const router = express.Router();


const {protect, adminOnly} = require("../middleware/authMiddleware");

router.post('/products',protect, addProduct);
router.get('/products',protect, getProducts);
router.put('/products/:id',protect, updateProduct);
router.delete('/products/:id',protect, deleteProduct);

module.exports = router;
