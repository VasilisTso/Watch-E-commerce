import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch(err) {
      console.error("Corrupted cart in localStorage, resetting.", err);
      localStorage.removeItem("cart");
      return [];
    }
  });

  // save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems])

  // Add item to cart
  const addToCart = (watch) => {
    setCartItems((prev) => {
      // Check if already exists
      const exists = prev.find((item) => item.id === watch.id);

      if (exists) {
        // Optional: increase quantity
        return prev.map((item) =>
          item.id === watch.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      toast.success("Added to cart")
      return [...prev, { ...watch, quantity: 1 }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    toast("Removed from cart", {icon: "🗑️"})
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all
  const clearCart = () => {
    toast("Cart cleared", { icon: "🧹" });
    setCartItems([]);
  }

  // adjust quantity
  const updateQuantity = (id, delta) => {
    setCartItems((prev) => 
      prev
        .map((item) => 
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta)}
            : item
        )
    )
  }

  // Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
