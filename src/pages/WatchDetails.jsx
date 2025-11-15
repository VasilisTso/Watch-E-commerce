import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockWatches } from "../data/mockWatches";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function WatchDetails() {
  const { refOrId } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_WATCH_API_TOKEN;
  const base = import.meta.env.VITE_WATCH_API_BASE_URL;

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addToCart(watch);
    navigate("/cart");
  };

  const handleAddToCart = () => {
    addToCart(watch);
  };

  useEffect(() => {
    async function fetchWatch() {
      try {
        const encodedRef = encodeURIComponent(refOrId);
        const resp = await fetch(`${base}/reference/list?api_token=${token}&reference_number=${encodedRef}`);
        const json = await resp.json();

        if (json.data && json.data.length > 0) {
          setWatch(json.data[0]);  // assuming first result is the watch
        } else {
          // fallback to mock
          const m = mockWatches.find(w => w.id === refOrId || w.reference_number === refOrId);
          setWatch(m || null);
        }
      } catch(err) {
        console.error("Fetch error. Mock Data", err);
        // fallback to mock
        const m = mockWatches.find(w => w.id === refOrId || w.reference_number === refOrId);
        setWatch(m || null);
      } finally {
        setLoading(false);
      }
    }
    fetchWatch();
  }, [refOrId, base, token])

  if (loading) return <div>Loading…</div>;
  if (!watch) {
    return (
      <div className="text-center text-gray-600">
        Watch not found.{" "}
        <Link to="/shop" className="text-blue-600 underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div className="max-w-5xl mx-auto p-4 md:p-8 text-left"
        initial={{ opacity: 0, y: 20 }}
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
          / <span className="text-gray-700">{watch.model}</span>
        </div>
      </motion.div>

      <motion.div className="max-w-5xl mx-auto p-4 md:p-6 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <img
              src={watch.image || "https://via.placeholder.com/500x500?text=No+Image"}
              alt={`${watch.brand} ${watch.model}`}
              className="w-full object-cover rounded-4xl px-2 py-2"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{watch.brand}</h1>
            <h1 className="text-2xl md:text-3xl font-semibold">{watch.model}</h1>
            <p className="text-gray-600 text-sm md:text-base">{watch.reference_number || watch.id}</p>
            
            <div className="space-y-2 text-gray-800 text-sm md:text-base mt-10">
              <p><strong>Movement:</strong> {watch.movement}</p>
              <p><strong>Year of production:</strong> {watch.year_of_production}</p>
              <p><strong>Case material:</strong> {watch.case_material}</p>
              <p><strong>Case diameter:</strong> {watch.case_diameter}</p>
              <p><strong>Description:</strong> {watch.description}</p>
            </div>
            
            <p className="text-blue-600 font-bold text-xl mt-10">{watch.price ? `${watch.price} €` : "Price unavailable"}</p>

            <div className="flex flex-col gap-4 mt-10">
              <button
                onClick={handleAddToCart}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default WatchDetails