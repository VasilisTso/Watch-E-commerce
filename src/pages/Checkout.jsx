import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cartItems, clearCartItems } = useCart();
    const [formData, setFormData] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("checkoutForm")) || {
                name: "",
                email: "",
                address: "",
                payment: "",
            }
        } catch {
            return {
                name: "",
                email: "",
                address: "",
                payment: "",
            }
        } 
    });

    // save from
    useEffect(() => {
        localStorage.setItem("checkoutForm", JSON.stringify(formData));
    }, [formData])

    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => {
        const numericPrice = parseFloat(item.price.replace(/,/g, "")) || 0;
        return sum + numericPrice;
    }, 0);
    //const tax = subtotal * 0.08;
    const total = subtotal // + tax;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if cart is empty
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
        }

        // Check if all form fields are filled
        if (!formData.name || !formData.email || !formData.address || !formData.payment) {
            alert("Please fill out all fields before proceeding.");
            return;
        }

        setProcessing(true); // show spinner

        setTimeout(() => {
            setProcessing(false);
            setOrderPlaced(true);
            clearCartItems();
            
            // Navigate back to shop after success
            setTimeout(() => navigate("/shop"), 3000);
        }, 2000);
    };

    if (processing) {
        return (
            <div className="flex flex-col items-center justify-center h-80 space-y-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600">Processing your order...</p>
            </div>
        );
    }

    if (orderPlaced) {
        return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
        >
            <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed!</h2>
            <p className="text-gray-600">Thank you for your purchase.</p>
        </motion.div>
        );
    }

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Link
                    to="/cart"
                    className="block text-left text-blue-600 mt-3 hover:text-blue-700"
                >
                    ← Back to Cart
                </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {/* Checkout Form */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        />
                        <textarea
                            name="address"
                            placeholder="Shipping Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 h-24"
                            required
                        />
                        <select
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="card">Credit / Debit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="crypto">Crypto</option>
                        </select>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Your cart is empty.</p>
                    ) : (
                        <>
                            <ul className="divide-y">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex justify-between py-3">
                                        <span>{item.brand}</span>
                                        <span>{item.model}</span>
                                        <span>${item.price}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t mt-4 pt-4 space-y-1">
                                <p className="flex justify-between"><span>Subtotal</span> <span>${subtotal.toLocaleString()}</span></p>
                                {/* <p className="flex justify-between"><span>Tax (8%)</span> <span>${tax.toLocaleString()}</span></p> */}
                                <p className="flex justify-between font-bold text-lg"><span>Total</span> <span>${total.toLocaleString()}</span></p>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto p-6 flex items-center justify-center"
            >
                {/* button disabled if no items in cart */}
                <button
                    onClick={handleSubmit}
                    disabled={cartItems.length === 0}
                    className={`cursor-pointer bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition mt-6 
                        ${cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`
                    }
                >
                    Place Order
                </button>
            </motion.div>
        </>
  )
}

export default Checkout