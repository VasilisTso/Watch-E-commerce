import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function WatchCard({ watch }) {
    // assuming `watch` has { id, brand, model, movement, image, price }
    return (
        <Link to={`/watch/${watch.reference_number || watch.id}`} className="block text-center bg-white border border-gray-300 rounded-lg hover:shadow-2xl hover:scale-101 transition-all duration-300">
            <img src={watch.image || "https://via.placeholder.com/300x300?text=No+Image"} 
                alt={`${watch.brand} ${watch.model}`}
                className="inline-flex items-center text hover:scale-105 transition-transform duration-500 px-8 my-8 w-64 h-64 object-cover"
            />

            {/* Overlay text */}
            <div className="p-4 text-center">
                <motion.h3
                    className="font-bold text-xl"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {watch.brand}
                </motion.h3>
                <motion.p
                    className="font-semibold text-md"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {watch.model}
                </motion.p>
                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {watch.movement}
                </motion.p>
                {watch.price && ( 
                    <motion.p
                        className="text-blue-700 font-bold mt-2"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {watch.price} €
                    </motion.p>
                )}
            </div>
        </Link>
    )
}

export default WatchCard