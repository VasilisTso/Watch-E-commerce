import React from 'react'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import { mockWatches } from "../data/mockWatches"; 

function Home() {
  const featured = mockWatches.slice(0, 3)

  return (
    <div className='flex flex-col items-center'>
      {/* HERO SECTION */}
      <motion.section className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center text-white overflow-hidden mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <img
          src="https://dynamicmedia.audemarspiguet.com/is/image/audemarspiguet/header_HP_CrossCollection_4000x2000_12?wid=3000&dpr=off"
          alt="Luxury watch background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover Timeless Elegance
          </motion.h1>

          <motion.p
            className="text-gray-200 text-lg mb-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explore our exclusive collection of luxury and modern watches.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURED WATCHES */}
      <motion.section
        className="w-full max-w-6xl px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className='text-3xl font-semibold text-center mb-10'>
          Featured Watches
        </h2>

        <div className='grid gap-8 sm:grid-cols lg:grid-cols-3'>
          {featured.map((watch) => (
            <Link to={`/watch/${watch.reference_number}`}
              key={watch.id}
              className='group relative border rounded-2xl overflow-hidden shadow-sm transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-500'
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden flex justify-center items-center">
                <img src={watch.image}
                  alt={watch.model}
                  className="h-full px-2 py-2 object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Overlay text */}
              <div className="p-4 text-center">
                <motion.h3
                  className="font-semibold text-lg"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.brand}
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.model}
                </motion.p>
                <motion.p
                  className="text-blue-600 font-bold mt-2"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {watch.price} €
                </motion.p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Home