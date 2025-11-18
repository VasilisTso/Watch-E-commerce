import React, { useState, useEffect } from 'react'
import { Link, NavLink } from "react-router-dom";
import { GiPocketWatch } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Scroll Hide / Reveal
    useEffect(() => {
        let lastScroll = window.scrollY;

        const onScroll = () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 80) setHidden(true);
            else setHidden(false);
            lastScroll = current;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <nav className='fixed top-0 left-0 mx-auto w-full z-50 bg-white shadow-sm mb-28'
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className='max-w-7xl mx-auto px-4 py-6 flex items-center justify-between'>
            <Link to="/" className='text-2xl font-bold text-gray-800 inline-flex items-center gap-1'>
                <GiPocketWatch className="text-blue-600" /> Chronos<span className='text-blue-600'>Collective</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-lg">
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
                        `relative transition hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
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

            {/* Mobile Button */}
            <button className="md:hidden text-3xl text-gray-800"
                onClick={() => setShowMobileMenu(true)}
            >
                <HiMenu />
            </button>
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
            {showMobileMenu && (
                <>
                    {/* DRAWER PANEL */}
                    <motion.div initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 w-full bg-white shadow-2xl z-50 p-6"
                    >
                        <div onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-between max-w-full mx-auto bg-white"
                        >
                            {/* Mobile Links */}
                            <div className="flex items-center gap-8 text-lg">
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
                                            `relative transition hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
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

                            {/* Close Button */}
                            <button
                                className="text-3xl"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                <HiX />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </nav>
  )
}

export default Navbar
