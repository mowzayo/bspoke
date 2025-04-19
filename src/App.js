import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ItemPage from "./pages/ItemPage";
import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
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
import { ProductProvider } from "./ProductContext";
import AdminOrders from "./pages/AdminOrders";
import ShopMen from "./pages/ShopMen"; // Import the new page
import ShopShirt from "./pages/ShopShirt"; // Import new page
import ShopPants from "./pages/ShopPants"; // Import new page
import "./App.css"; // Add global styles

function App() {
  return (
    <div className="app-container">
      <ProductProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/ShopMen" element={<ShopMen />} />
              <Route path="/ShopShirt" element={<ShopShirt />} />
              <Route path="/ShopPants" element={<ShopPants />} />
              <Route path="/CartCheckout" element={<CartCheckout />} />
              <Route path="/CartComplete" element={<CartComplete />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/item/:productId" element={<ItemPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishList" element={<WishList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/adminorders" element={<AdminOrders />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
