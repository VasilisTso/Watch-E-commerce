import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (watch) => {
    setCartItems((prev) => {
      // Check if already exists
      const exists = prev.find((item) => item.id === watch.id);
      if (exists) {
        // Optional: increase quantity
        return prev.map((item) =>
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all
  const clearCart = () => setCartItems([]);

  // Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
