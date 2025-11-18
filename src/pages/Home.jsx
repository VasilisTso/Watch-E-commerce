import React from 'react'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import { mockWatches } from "../data/mockWatches";
import { GiWatch } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";

function Home() {
  const featured = mockWatches.slice(0, 4)

  return (
    <div className='flex flex-col items-center'>
      {/* HERO SECTION */}
      <motion.section className="relative w-full -mt-6 h-[92vh] flex flex-col justify-center items-left text-center text-white overflow-hidden"
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
        <div className="relative z-10 max-w-3xl px-4 py-8">
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

      {/* FEATURED BRANDS */}
      <motion.section className='w-full py-28 px-6'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-10">
          Featured Brands
        </h2>

        <div className='max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12'>
          {/* Rolex */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Logo_da_Rolex.png/1200px-Logo_da_Rolex.png"
            alt="Rolex"
            className="h-18 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* Audemars Piguet */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Audemars_Piguet_logo.png"
            alt="Audemars Piguet"
            className="h-14 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* Patek Philippe */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Patek_Philippe_SA_logo.svg/1200px-Patek_Philippe_SA_logo.svg.png"
            alt="Patek Philippe"
            className="h-18 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* Richard Mille */}
          <img
            src="https://brandlogos.net/wp-content/uploads/2025/02/richard_mille-logo_brandlogos.net_fbdmr-512x512.png"
            alt="Richard Mille"
            className="h-42 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* Omega */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/1200px-Omega_Logo.svg.png"
            alt="Omega"
            className="h-12 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* TAG Heuer */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/TAG_Heuer_Logo.svg/1200px-TAG_Heuer_Logo.svg.png"
            alt="TAG Heuer"
            className="h-14 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />

          {/* Tissot */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Tissot_Logo.svg/2560px-Tissot_Logo.svg.png"
            alt="Tissot"
            className="h-12 grayscale-70 hover:grayscale-0 hover:scale-110 transition duration-300"
          />
        </div>
      </motion.section>

      {/* PARALLAX LUXURY BANNER */}
      <section className="relative w-full min-h-[90vh] py-26 overflow-visible">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/wc-photo/image/upload/c_limit,w_2384,g_center/f_auto/q_auto/v1698405792/cms/DISCOVER/Editorial_Articles/Stories_pre-Nov_2022/3_2_2384_X1192_Buy_Banner_159deb42d2?_a=BAVAfVDW0')",
          }}
        ></div>

        {/* Dark overlay backdrop-blur-xs https://www.bobswatches.com/rolex-blog/wp-content/uploads/2022/01/Rolex-vs-Patek-Banner.jpg*/}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
            Timeless Luxury
          </h2>
          <p className="mt-4 text-lg max-w-xl text-gray-200">
            Experience craftsmanship that transcends generations. Only the finest
            curated timepieces.
          </p>

            <motion.div
            className="w-full px-6 py-2 mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className='max-w-7xl mx-auto bg-white/00 py-4 px-8 rounded-4xl grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {featured.map((watch) => (
                <Link to={`/watch/${watch.reference_number}`}
                  key={watch.id}
                  className='group relative bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-500'
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
                      className="font-semibold text-black text-lg"
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
          </motion.div>
        </div>
      </section>

      {/* FEATURED WATCHES */}
      {/* ADDED IN BANNER
      <motion.section
        className="w-full px-6 py-26 bg-black/50 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className='text-4xl font-semibold text-center mb-20'>
          Featured Watches
        </h2>

        <div className='max-w-7xl mx-auto bg-white py-16 px-16 rounded-4xl grid gap-8 sm:grid-cols lg:grid-cols-4'>
          {featured.map((watch) => (
            <Link to={`/watch/${watch.reference_number}`}
              key={watch.id}
              className='group relative border border-gray-300 rounded-2xl overflow-hidden shadow-sm transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-500'
            >
              <div className="aspect-square overflow-hidden flex justify-center items-center">
                <img src={watch.image}
                  alt={watch.model}
                  className="h-full px-2 py-2 object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>

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
      </motion.section>*/}

      {/* WHY CHOOSE US */}
      <section className='w-full max-w-6xl mx-auto py-26 px-6'>
        <h2 className='text-3xl font-semibold text-center mb-14'>
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Badge 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 shadow-md mb-4">
              <span className="text-3xl"><GiWatch /></span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Authentic Timepieces</h3>
            <p className="text-gray-600 max-w-xs">
              Every watch in our collection is verified for authenticity and quality.
            </p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 shadow-md mb-4">
              <span className="text-3xl"><RiSecurePaymentFill /></span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-600 max-w-xs">
              Your data and transactions are protected with industry-leading security.
            </p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 shadow-md mb-4">
              <span className="text-3xl"><FaShippingFast /></span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Insured Shipping</h3>
            <p className="text-gray-600 max-w-xs">
              We deliver your timepiece safely and quickly, fully insured end-to-end.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home