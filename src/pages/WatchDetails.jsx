import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockWatches } from "../data/mockWatches";

function WatchDetails() {
  const { refOrId } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = import.meta.env.VITE_WATCH_API_TOKEN;
  const base = import.meta.env.VITE_WATCH_API_BASE_URL;

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
      <div className="max-w-3xl mx-auto">
        <Link to="/shop" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Shop
        </Link>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={watch.image || "https://via.placeholder.com/500x500?text=No+Image"}
            alt={`${watch.brand} ${watch.model}`}
            className="w-full md:w-1/2 object-cover rounded"
          />
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold">{watch.brand} {watch.model}</h1>
            <p className="text-gray-600">{watch.reference_number || watch.id}</p>
            <p className="text-blue-600 font-bold">{watch.price ? `$${watch.price}` : "Price unavailable"}</p>
            <div className="space-y-2">
              <p><strong>Movement:</strong> {watch.movement}</p>
              <p><strong>Year of production:</strong> {watch.year_of_production}</p>
              <p><strong>Case material:</strong> {watch.case_material}</p>
              <p><strong>Case diameter:</strong> {watch.case_diameter}</p>
              <p><strong>Description:</strong> {watch.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WatchDetails