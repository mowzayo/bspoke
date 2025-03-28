import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ItemPage from "./pages/ItemPage";
import Footer from "./components/Footer";
import About from "./pages/About";
import CartCheckout from "./pages/CartCheckout";
import CartComplete from "./pages/CartComplete";
import WishList from "./pages/WishList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ShopPage from "./pages/ShopPage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { CartProvider } from "./CartContext";
import "./App.css"; // Add global styles

function App() {
  return (
    <div className="app-container">
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/CartCheckout" element={<CartCheckout />} />
            <Route path="/CartComplete" element={<CartComplete />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/item/:productId" element={<ItemPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
