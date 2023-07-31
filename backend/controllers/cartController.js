// backend/controllers/cartController.js

const cartService = require('../service/cartService');

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartService.getCartItems();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const addedItem = await cartService.addToCart("64c66d3c225c7d54fa7df812", quantity);
    res.json(addedItem);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    await cartService.removeFromCart(productId);
    res.json({ message: 'Item removed from the cart' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
};
