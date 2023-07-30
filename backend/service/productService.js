// backend/services/productService.js

const Product = require("../models/Product");

// Get all products
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error("Error --> getAllProducts ", error);
    throw new Error("Failed to fetch products from the database.");
  }
};

// Get a product by ID
const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  } catch (error) {
    console.error("Error --> getProductById ", error);
    throw new Error("Failed to fetch product from the database.");
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
  } catch (error) {
    console.error("Error --> createProduct ", error);
    throw new Error("Failed to create a new product.");
  }
};

// Update a product
const updateProduct = async (productId, productData) => {
  try {
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new Error("Product not found.");
    // }
    // product.set(productData);
    const updateDoc = {

      $set: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        imageUrl: productData.imageUrl
      },
    };
    const filter = { _id: productId };
    const options = { upsert: false };

    const updatedProduct = Product.findOneAndUpdate(filter, updateDoc);
    return updatedProduct;
  } catch (error) {
    console.error("Error --> updateProduct ", error);
    throw new Error("Failed to update the product.");
  }
};

// Delete a product
const deleteProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const query = { id: productId };
    const deleteProduct = await product.deleteOne({ _id: productId });

    return;
  } catch (error) {
    console.error("Error --> deleteProduct ", error);
    throw new Error("Failed to delete the product.");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
