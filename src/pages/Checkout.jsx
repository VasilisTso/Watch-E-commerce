import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";

function Checkout() {
    const { cartItems, clearCart } = useCart();
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
        return sum + numericPrice * item.quantity;
    }, 0);
    const tax = subtotal * (0.24/(1+0.24));
    const total = subtotal  // + tax;

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
            clearCart();
        }, 2000);
    };

    // Add redirect after order placed
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (orderPlaced) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [orderPlaced]);

    // Navigate when countdown reaches 0
    useEffect(() => {
        if (countdown === 0 && orderPlaced) {
            navigate("/shop");
        }
    }, [countdown, orderPlaced, navigate]);

    // order number generator
    const orderNumberRef = React.useRef(
        Math.floor(100000 + Math.random() * 900000)
    );
    const orderNumber = orderNumberRef.current;

    if (orderPlaced) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
            >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <span className="text-white text-4xl">✓</span>
                </div>

                <h2 className="text-3xl font-bold text-green-600 mb-2">
                    Order Placed!
                </h2>

                <p className="text-gray-600 mb-4">
                    Your order number is <span className="font-bold">#{orderNumber}</span>
                </p>

                <p className="text-gray-500">Redirecting to shop in {countdown}…</p>
            </motion.div>
        );
    }

    const LoadingOverlay = () => (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg">Processing payment…</p>
        </div>
    );


    return (
        <>
            {processing && <LoadingOverlay />}

            <motion.div initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl bg-white z-10 mx-auto p-2 md:py-4"
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
                        />
                        <input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />
                        <textarea
                            name="address"
                            placeholder="Shipping Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 h-24"
                        />
                        <select
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
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
                            <ul className="">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="flex justify-between items-center py-3">
                                        <div className="flex flex-col items-baseline justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">x{item.quantity}</span>
                                                <span className="text-lg text-gray-950">{item.brand}</span>
                                            </div>
                                            <span className="text text-gray-600">{item.model}</span>
                                        </div>
                                        <div className="flex flex-col items-baseline justify-between">
                                            <span className="text-lg text-gray-950">
                                                {(parseFloat(item.price.replace(/,/g, "")) * item.quantity).toLocaleString()} €
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t mt-4 pt-4 space-y-1">
                                <p className="flex justify-between"><span>Price</span> <span>{subtotal.toLocaleString()} €</span></p>
                                <p className="flex justify-between"><span>VAT Included (24%)</span> <span>{tax.toLocaleString()} €</span></p>
                                <p className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2"><span>Total</span> <span>{total.toLocaleString()} €</span></p>
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