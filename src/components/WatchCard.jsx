import React from "react";
import { Link } from "react-router-dom";

function WatchCard({ watch }) {
    // assuming `watch` has { id, brand, model, movement, image, price }
    return (
        <Link to={`/watch/${watch.reference_number || watch.id}`} className="block border rounded-lg hover:shadow-lg transition-shadow">
            <img src={watch.image || "https://via.placeholder.com/300x300?text=No+Image"} 
                alt={`${watch.brand} ${watch.model}`}
                className="inline-flex items-center px-8 my-8 w-64 h-64 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{watch.brand} {watch.model}</h3>
                <h5 className="">{watch.reference_number}</h5>
                <p className="text-gray-500">{watch.movement}</p>
                {watch.price && (
                    <p className="text-blue-600 font-bold mt-2">${watch.price}.00</p>
                )}
            </div>
        </Link>
    )
}

export default WatchCard