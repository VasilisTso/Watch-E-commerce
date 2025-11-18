import React from 'react'

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className='text-center w-full bg-black/70 py-10 border-t border-gray-600'>
            <div className="max-w-7xl mx-auto px-4">
                <button onClick={scrollToTop}
                    className="text-gray-200 hover:text-gray-300 hover:scale-102 cursor-pointer mb-4 rounded-lg px-2 py-1 transition shadow-sm shadow-gray-600"
                    >
                    Back to top ↑
                </button>
                <p className='text-gray-200'>
                    © {new Date().getFullYear()} Chronos Collective. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer