import React from 'react'

function Home() {
  return (
    <section className='text-center'>
      <h1 className='text-4xl font-bold mb-4'>
        Discover Timeless Elegance
      </h1>
      <p className='text-gray-600 mb-8'>
        Explore our exclusive collection of luxury and modern watches.
      </p>
      <a href="/shop"
        className='bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition'
      >
        Shop Now
      </a>
    </section>
  )
}

export default Home