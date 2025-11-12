import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useCart } from "../context/CartContext"; 

function Cart() {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <>
      <motion.div className="max-w-5xl mx-auto p-2 md:p-4 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:underline text-blue-600">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" className="hover:underline text-blue-600">
            Shop
          </Link>{" "}
          / <span className="text-gray-700">Cart</span>
        </div>
      </motion.div>

      <motion.div className="max-w-5xl mx-auto p-2 md:p-4 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4 border-b pb-4">Your cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
            <img src="https://cdn-icons-png.flaticon.com/128/1170/1170576.png"
              alt="Empty Cart"
              className="w-28 mb-6 opacity-80" 
            />
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link to="/shop"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart items list*/}
            {cartItems.map((item) => (
              <div key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image}
                    alt={item.model}
                    className="w-20 max-h-40 object-cover rounded" 
                  />

                  <div>
                    <p className="font-semibold">{item.brand}</p>
                    <p className="text-gray-600 text-sm">{item.model}</p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                  <p className="font-bold text-blue-600">${item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal section */}
            <div className="flex justify-between items-center pt-6">
              <p className="text-lg font-semibold">Subtotal</p>
              <p className="text-lg font-bold text-blue-600">
                ${subtotal.toLocaleString()}
              </p>
            </div>

            <Link to="/checkout"
              className="block bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition mt-8 cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default Cart