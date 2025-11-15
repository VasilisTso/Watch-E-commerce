import React, { useEffect, useState } from "react";
import WatchCard from "../components/WatchCard";
import { mockWatches } from "../data/mockWatches";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { label } from "framer-motion/client";

function Shop() {
  const [watches, setWatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterMovement, setFilterMovement] = useState("");
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [sortOrder, setSortOrder] = useState("");// e.g., "priceAsc", "priceDesc"

  const token = import.meta.env.VITE_WATCH_API_TOKEN;
  const baseUrl = import.meta.env.VITE_WATCH_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`${baseUrl}/reference/list?api_token=${token}&brand=${filterBrand || ''}`);
        const json = await resp.json();
        // Here: maybe we then fetch details for each reference number or use a combined endpoint
        // For simplicity: assume we get full watch objects with our fields
        setWatches(json.data);
        setFiltered(json.data);
  
        // derive unique brands
        const uniqueBrands = Array.from(new Set(json.data.map(w => w.brand)));
        setBrands(uniqueBrands);
      } catch(err) {
      console.error("API fetch failed, using mock data", err);
      setWatches(mockWatches);
      setFiltered(mockWatches);
      const uniqueBrands = Array.from(new Set(mockWatches.map(w => w.brand)));
      setBrands(uniqueBrands);
      }
    }
    fetchData();
  }, [])

  // helper function to convert "340,000" -> 340000
  const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
    return Number(priceStr.replace(/,/g, "")) || 0;
  };

  useEffect(() => {
    let data = [...watches];

    // brand filter
    if (filterBrand && filterBrand !== "") {
      data = data.filter(
        (w) => w.brand?.toLowerCase() === filterBrand.toLowerCase()
      );
    }

    // movement filter
    if (filterMovement && filterMovement !== "") {
      data = data.filter(
        (w) => w.movement?.toLowerCase() === filterMovement.toLowerCase()
      );
    }

    // price range filter
    data = data.filter((w) => {
      const price = parsePrice(w.price);
      const [min, max] = priceRange;
      return price >= min && price <= (max || Infinity);
    });

    // sorting
    if (sortOrder === "priceAsc") {
      data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOrder === "priceDesc") {
      data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    setFiltered(data);
  }, [watches, filterBrand, filterMovement, priceRange, sortOrder]);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        {/* sidebar */}
        <aside className="lg:col-span-1 p-6 bg-white shadow-mf rounded-xl h-fit sticky top-4 space-y-6">
          <h3 className="text-xl font-semibold mb-3">Filters</h3>

          {/* brand filters */}
          <div>
            <p className="font-medium mb-2">Brand</p>
            <div className="space-y-2">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2">
                  <input type="checkbox" 
                    checked={filterBrand === b}
                    onChange={() => 
                      setFilterBrand(filterBrand === b ? "" : b)
                    }
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* MOVEMENT FILTER */}
          <div>
            <p className="font-medium mb-2">Movement</p>
            <label className="flex items-center gap-2">
              <input type="checkbox"
                checked={filterMovement === "Automatic"}
                onChange={() => 
                  setFilterMovement(filterMovement === "Automatic" ? "" : "Automatic")
                }
              />
              Automatic
            </label>
            <label className="flex items-center gap-2">
            <input type="checkbox"
              checked={filterMovement === "Battery"}
              onChange={() =>
                setFilterMovement(filterMovement === "Battery" ? "" : "Battery")
              }
            />
            Battery
          </label>
          </div>

          {/* PRICE SLIDER */}
          <div>
            <p>Max Price</p>
            <input type="range" 
              min="0"
              max="1000000"
              step="1000"
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <span>
              Up to: {priceRange[1].toLocaleString()} €
            </span>
          </div>

          {/* SORT */}
          <div>
            <p className="font-medium mb-2">Sort</p>
            
          </div>

          {/* RESET */}
          <div>
            <button>
              Reset Filters
            </button>
          </div>
        </aside>

        {/* WATCHES GRID */}
        <section>
          <h2>Shop Watches</h2>


        </section>
      </motion.div>















      <motion.div initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-semibold mb-4">Shop Watches</h2>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 border-t border-gray-400 py-6">
          <select value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select value={filterMovement}
            onChange={e => setFilterMovement(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Movements</option>
            <option value="Automatic">Automatic</option>
            <option value="Battery">Battery</option>
          </select>

          <label className="flex items-center">
            Price up to:
            <input type="number" 
              placeholder="Max"
              onChange={e => setPriceRange([0, Number(e.target.value) || Infinity])}
              className="border px-3 py-2 rounded ml-2"
            />
          </label>

          <select value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low → High</option>
            <option value="priceDesc">Price: High → Low</option>
          </select>
        </div>

        {/* Results Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(watch => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </motion.div>
    </>
  )
}

export default Shop