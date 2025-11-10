import React from 'react'

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className='bg-gray-100 text-center py-6 mt-8'>
            <button onClick={scrollToTop}
                className="text-gray-500 hover:text-gray-700 cursor-pointer mb-4 rounded-lg px-2 py-1 transition shadow-sm shadow-gray-600"
                >
                Back to top ↑
            </button>
            <p className='text-gray-500'>
                © {new Date().getFullYear()} WatchShop. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer