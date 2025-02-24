import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";
import "./Navbar.css";
import logo from "../assets/newblg.png";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const cartItems = Array.isArray(cart) ? cart : [];
  const cartItemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Hamburger Menu Button (Left)  */}
    
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
  



        {/* Logo (Center) 
        <h1 className="logo">
          <Link to="/">
            <img src={logo} alt="BSPoke Logo" width="200" height="80" />
          </Link>
  </h1> */}


   {/* Center: Logo */}
   <div className="logo-container">
      <Link to="/"> <img src={logo} alt="BSPoke Logo" className="logo"  /> </Link>
    </div>

        {/* Cart Button (Right) */}
        <div className="cart-container">
          <button className="cart-icon" onClick={() => setShowCart(!showCart)}>
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>

          {showCart && (
            <div className="cart-dropdown">
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-content">
                        <img src={item.image} alt={item.name} width="80" height="70" />
                        <span>{item.name}</span>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                      <span className="remove-btn" onClick={() => removeFromCart(item.id)}>X</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty</p>
              )}
              <Link to="/cart" className="view-cart-btn">View Cart</Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links - Mobile Hidden, Show on Toggle */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="nav-link" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/WishList" className="nav-link" onClick={() => setMenuOpen(false)}>WishList</Link>
        </div>
    </nav>
  );
};

export default Navbar;
