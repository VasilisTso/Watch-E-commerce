import React, { useEffect, useState } from "react";
import WatchCard from "../components/WatchCard";
import { mockWatches } from "../data/mockWatches";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function Shop() {
  const [watches, setWatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterMovement, setFilterMovement] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortOrder, setSortOrder] = useState("");// e.g., "priceAsc", "priceDesc"
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // brand filter
  const [brandSearch, setBrandSearch] = useState("");
  const [brandExpanded, setBrandExpanded] = useState(false); // collapsed by default

  const filteredBrandsList = brands.filter(b =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // When collapsed, show only first 4
  const visibleBrands = brandExpanded
    ? filteredBrandsList
    : filteredBrandsList.slice(0, 4);


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
        const uniqueBrands = Array.from(new Set(json.data.map(w => w.brand)))
          .sort((a, b) => a.localeCompare(b));
        setBrands(uniqueBrands);
      } catch(err) {
      console.error("API fetch failed, using mock data", err);
      setWatches(mockWatches);
      setFiltered(mockWatches);
      const uniqueBrands = Array.from(new Set(mockWatches.map(w => w.brand)))
        .sort((a, b) => a.localeCompare(b));
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
      data = data.filter((w) => {
        if (filterMovement === "Battery") {
          // treat Quartz as Battery
          return w.movement?.toLowerCase() === "battery" || w.movement?.toLowerCase() === "quartz";
        }
        return w.movement?.toLowerCase() === filterMovement.toLowerCase();
      });
    }

    // price range filter
    data = data.filter((w) => {
      const price = parsePrice(w.price);
      const [min, max] = priceRange;
      return price >= min && price <= max;
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
        {/* sidebar(Desktop) */}
        <aside className="hidden lg:block lg:col-span-1 p-6 bg-white shadow-mf rounded-xl h-fit sticky top-4 space-y-6 border-r border-gray-200">
          <h3 className="text-xl font-semibold mb-3">Filters</h3>
          {/* brand filters */}
          <div>
            <p className="font-medium mb-2">Brand</p>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search brand"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <div className="space-y-2">
              {visibleBrands.map((b) => (
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
            {/* Show more / Show less */}
            {filteredBrandsList.length > 4 && (
              <button onClick={() => setBrandExpanded(!brandExpanded)}
                className="text-blue-600 mt-2 text-sm cursor-pointer"
              >
                {brandExpanded ? "Show Less" : "Show More"}
              </button>
            )}
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
            <p className="font-medium mb-2">Price Range</p>
            {/* MIN & MAX Inputs */}
            <div className="flex items-center gap-3 mb-3">
              <input
                type="number"
                value={priceRange[0]}
                min={0}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                }
                className="w-24 px-2 py-1 border rounded"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1] === Infinity ? "" : priceRange[1]}
                min={0}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value) || Infinity])
                }
                className="w-24 px-2 py-1 border rounded"
                placeholder="Max"
              />
            </div>

            {/* Slider - controls MAX only */}
            <input type="range" 
              min="0"
              max="2000000"
              step="1000"
              value={priceRange[1] === Infinity ? 2000000 : priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || Infinity])}
              className="w-full"
            />
            {/* Display Value */}
            <span className="text-gray-700 block mt-1">
              Up to: {priceRange[1] === Infinity ? "∞" : priceRange[1].toLocaleString()} €
            </span>
          </div>

          {/* SORT */}
          <div>
            <p className="font-medium mb-2">Sort</p>
            <select value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              <option value="priceAsc">Price: Low → High</option>
              <option value="priceDesc">Price: High → Low</option>
            </select>
          </div>

          {/* RESET */}
          <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 transition px-4 py-2 rounded-lg"
            onClick={() => {
              setFilterBrand("");
              setFilterMovement("");
              setPriceRange([0, Infinity]);
              setSortOrder("");
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* MOBILE FILTER DRAWER */}
        {isFilterOpen && (
          <motion.div initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 flex"
            onClick={() => setIsFilterOpen(false)} // close when backdrop clicked
          >
            <div
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking panel
              className="w-72 max-w-full bg-white h-full p-6 overflow-y-auto shadow-xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-600 text-lg"
                >
                  ✕
                </button>
              </div>

              {/* brand filters */}
              <div>
                <p className="font-medium mb-2">Brand</p>
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search brands…"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="space-y-2">
                  {visibleBrands.map((b) => (
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
                {/* Show more / Show less */}
                {filteredBrandsList.length > 4 && (
                  <button
                    onClick={() => setBrandExpanded(!brandExpanded)}
                    className="text-blue-600 mt-2 text-sm cursor-pointer"
                  >
                    {brandExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
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
                <p className="font-medium mb-2">Max Price</p>
                <input type="range" 
                  min="0"
                  max="1000000"
                  step="1000"
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full"
                />
                <span className="text-gray-700 block mt-1">
                  Up to: {priceRange[1].toLocaleString()} €
                </span>
              </div>

              {/* SORT */}
              <div>
                <p className="font-medium mb-2">Sort</p>
                <select value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">None</option>
                  <option value="priceAsc">Price: Low → High</option>
                  <option value="priceDesc">Price: High → Low</option>
                </select>
              </div>

              {/* RESET */}
              <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 transition px-4 py-2 rounded-lg"
                onClick={() => {
                  setFilterBrand("");
                  setFilterMovement("");
                  setPriceRange([0, Infinity]);
                  setSortOrder("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Filters
          </button>
        </div>

        {/* WATCHES GRID */}
        <section className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Shop Watches</h2>

          {filtered.length === 0 && (
            <p className="text-gray-500 text-lg mt-10">No watches found for your filters.</p>
          )}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Shop