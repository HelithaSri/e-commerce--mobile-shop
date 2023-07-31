// backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart - Get all cart items
router.get('/', cartController.getCartItems);

// POST /cart - Add item to cart
router.post('/', cartController.addToCart);

// DELETE /cart/:productId - Remove item from cart
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
