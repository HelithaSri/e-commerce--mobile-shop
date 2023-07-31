// backend/services/cartService.js

const Cart = require('../models/Cart');

// Get cart items
const getCartItems = async () => {
    try {
        return await Cart.find();
    } catch (error) {
        console.error("Error --> getCartItems ", error);
        throw new Error('Failed to fetch cart items from the database.');
    }
};

// Add item to cart
const addToCart = async (productId, quantity) => {
    try {
        const cartItem = await Cart.findOne({'items.productId': productId});

        if (cartItem != null) {
            // If the item already exists in the cart, update the quantity
            let newQuantity = cartItem.items[0].quantity + Number(quantity);
            const cartData = {
                items: [
                    {productId: productId, quantity: newQuantity},
                ],
            };
            return await Cart.findOneAndUpdate({_id: cartItem._id}, cartData, {new: true}); // new:true | return updated values and new:false return old value after update
        } else {
            ``
            // If the item is not in the cart, create a new cart item
            const cartData = {
                items: [
                    {productId: productId, quantity: quantity},
                ],
            };
            const newCartItem = new Cart(cartData);
            newCartItem.save()
                .then(savedCart => {
                    console.log('Cart saved successfully:');
                })
                .catch(error => {
                    console.error('Error saving cart:', error);
                });
            // await newCartItem.save();
            return newCartItem;
        }
    } catch (error) {
        console.error("Error --> addToCart ", error);
        throw new Error('Failed to add item to the cart.');
    }
};

// Remove item from cart
const removeFromCart = async (productId) => {
    try {
        let deletedItem = await Cart.deleteOne({ 'items.productId': productId });
        if (deletedItem.deletedCount === 0){
            throw new Error("Item not found.");
        }
        console.log("Item removed from the cart")
        return;
    } catch (error) {
        console.error("Error --> removeFromCart ", error);
        throw new Error('Failed to remove item from the cart.');
    }
};

module.exports = {
    getCartItems,
    addToCart,
    removeFromCart,
};
