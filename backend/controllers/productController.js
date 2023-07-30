// backend/controllers/productController.js

const Product = require("../models/Product");
const productService = require("../service/productService");
const commonResponse = require("../utils/response");

// GET /products - Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    // const products = await Product.find();
    const response = commonResponse(200, "Success", "All Products", products);
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// GET /products/:id - Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);

    const response = commonResponse(200, "Success", "Selected Product".product);
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// POST /products - Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, quantity, imageUrl } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      imageUrl,
    });

    const savedProduct = await productService.createProduct(newProduct);
    const response = commonResponse(
      200,
      "Success",
      "New Product Added",
      savedProduct
    );
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// PUT /products/:id - Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, imageUrl } = req.body;

  try {
    const updatedProduct = new Product({
      name,
      description,
      price,
      quantity,
      imageUrl,
    });
    const product = await productService.updateProduct(id, updatedProduct);
    const response = commonResponse(200, "Success", "Product updated", product);
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

// DELETE /products/:id - Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.deleteProduct(id);
    const response = commonResponse(200, "Success", "Product deleted");
    res.json(response);
  } catch (error) {
    const response = commonResponse(500, "Failed", "Server error");
    res.status(500).json(response);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
