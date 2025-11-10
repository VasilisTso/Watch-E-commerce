import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { GiPocketWatch } from "react-icons/gi";

function Navbar() {
  return (
    <nav className='bg-white shadow-md rounded-xl'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link to="/" className='text-2xl font-bold text-gray-800 inline-flex items-center gap-1'>
                <GiPocketWatch /> Chronos<span className='text-blue-600'>Collective</span>
            </Link>

            <div className='space-x-6'>
                <NavLink to="/" 
                    className={({ isActive }) => 
                        `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    Home
                </NavLink>
                <NavLink to="/shop" 
                    className={({ isActive }) => 
                        `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    Shop
                </NavLink>
                <NavLink to="/cart" 
                    className={({ isActive }) => 
                        `hover:text-blue-600 ${isActive ? "text-blue-600" : "text-gray-700"}`    
                    }
                >
                    Cart
                </NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
