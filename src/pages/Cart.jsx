import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function Cart() {
  //for now empty
  const cartItems = []; // later will come from context or state

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-sm text-gray-500 mb-6">
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

      <motion.div className="max-w-5xl mx-auto p-4 md:p-8 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-bold mb-4">Your cart </h1>

        {cartItems.length === 0 ? (
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-28 mb-6 opacity-80" 
            />
            <p className="text-lg mb-4">Your cart is empty.</p>
            <Link></Link>
          </div>
        ) : (
          <div>
            {}
          </div>
        )}
      </motion.div>
    </>
  )
}

export default Cart