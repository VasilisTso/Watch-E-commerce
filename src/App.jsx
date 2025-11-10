import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import WatchDetails from "./pages/WatchDetails";
import Cart from "./pages/Cart";

function App() {

  return (
    <Routes>
      {/* MainLayout wraps all pages with Navbar & Footer */}
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="watch/:refOrId" element={<WatchDetails />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
