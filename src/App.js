import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import ItemPage from "./pages/ItemPage";
import Footer from "./components/Footer";
import About from "./pages/About";
import CartCheckout from "./pages/CartCheckout";
import CartComplete from "./pages/CartComplete";
import WishList from "./pages/WishList";
import { WishlistProvider } from "./WishlistContext";
// import WishlistContext from "./WishlistContext";

import { CartProvider } from './CartContext'; // Adjust the path if necessary

import ShopPage from './pages/ShopPage';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <CartProvider>
      <WishlistProvider>
       <Router>
       <Navbar cart={Cart} />
      <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path ="/CartCheckout" element={<CartCheckout />} />
      <Route path="/CartComplete" element={<CartComplete />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/item/:productId" element={<ItemPage />} />
     <Route path="/about" element={<About />} />
     <Route path="/wishList" element={<WishList />} />

 </Routes>
 <Footer />
    </Router>
    </WishlistProvider>
    </CartProvider>
    </div>
  );
}

export default App;
