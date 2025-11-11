import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { GiPocketWatch } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

function Navbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className='bg-white shadow-md rounded-xl'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link to="/" className='text-2xl font-bold text-gray-800 inline-flex items-center gap-1'>
                <GiPocketWatch /> Chronos<span className='text-blue-600'>Collective</span>
            </Link>

            <div className='space-x-6 flex items-center justify-center'>
                <NavLink to="/" 
                    className={({ isActive }) => 
                        `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    Home
                </NavLink>
                <NavLink to="/shop" 
                    className={({ isActive }) => 
                        `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    Shop
                </NavLink>
                <NavLink to="/cart" 
                    className={({ isActive }) => 
                        `relative hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    <FaShoppingCart className="w-6 h-6"/>

                    <AnimatePresence>
                        {cartCount > 0 && (
                            <motion.span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                                key={cartCount} // makes it re-animate when count changes
                                initial={{ scale: 0, opacity: 0, y: -5 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0, opacity: 0, y: -5 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
