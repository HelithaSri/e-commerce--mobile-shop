// backend/controllers/cartController.js

const cartService = require('../service/cartService');
const commonResponse = require("../utils/response");

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await cartService.getCartItems();
    const response = commonResponse(200, "Success", "All Cart Items", cartItems);
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const addedItem = await cartService.addToCart(productId, quantity);
    const response = commonResponse(200, "Success", "Product Added to Cart", addedItem);
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    await cartService.removeFromCart(productId);
    const response = commonResponse(200, "Success", "Item removed from the cart");
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
};
