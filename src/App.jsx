import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Sidebar from './Components/Sidebar'
import Topbar from './Components/Topbar'

import Dashboard from './Pages/Dashboard'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail';
import Charts from './Pages/Charts';
import BuyNow from './Pages/Buy';


const App = () => {
  return (
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Topbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path = "Charts" element = {<Charts/>} />
            <Route path="/buy" element={<BuyNow />} />
          </Routes>
        </div>
      </div>
  )
}

export default App
