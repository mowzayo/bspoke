import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useCart } from "../CartContext";
import "./Navbar.css";
import logo from "../assets/newblg.png";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { cart, removeFromCart, isLoggedIn, user, logout } = useCart();
  const navigate = useNavigate();

  const cartItems = Array.isArray(cart) ? cart : [];
  const cartItemCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setShowProfileDropdown(false);
    navigate("/");
  };

  const handleImageClick = (productId) => {
    navigate(`/shop/${productId}`);
    setShowCart(false);
  };

  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    setShowCart((prev) => !prev); // Toggle showCart on click
  };

  const handleMouseLeave = () => {
    // No action needed for click-based toggle
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="BSPoke Logo" className="logo" />
          </Link>
        </div>

        <div className="cart-container flex items-center space-x-4">
          <div
            className="cart-icon-wrapper relative"
            onClick={handleMouseEnter} // Changed to onClick
          >
            <button className="cart-icon">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>

            {showCart && (
              <div className="cart-dropdown">
                {cartItems.length > 0 ? (
                  <ul>
                    {cartItems.map((item) => {
                      console.log(
                        "Navbar - Cart Item:",
                        JSON.stringify(item, null, 2)
                      );
                      const imageSrc =
                        (item.images && item.images[0]) || // Online: server might return images array
                        item.image || // Offline: saved image
                        "/placeholder.jpg"; // Fallback
                      return (
                        <li
                          key={`${item.productId}-${item.size}`}
                          className="cart-item"
                        >
                          <div className="cart-item-content">
                            <img
                              src={imageSrc}
                              alt={item.name}
                              width="80"
                              height="70"
                              className="cursor-pointer"
                              onClick={() => handleImageClick(item.productId)}
                            />
                            <span>{item.name}</span>
                            <span>
                              ₦{(item.price * (item.quantity || 1)).toFixed(2)}{" "}
                              {/* Changed $ to ₦ */}
                            </span>
                          </div>
                          <span
                            className="remove-btn"
                            onClick={() =>
                              removeFromCart(item.productId, item.size)
                            }
                          >
                            X
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>Your cart is empty</p>
                )}
                <Link to="/cart" className="view-cart-btn">
                  View Cart
                </Link>
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div className="profil-container">
              <button
                className="profil-icon"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <FaUser size={20} />
              </button>
              {showProfileDropdown && (
                <div className="profil-dropdown right-0">
                  <Link
                    to="/profile"
                    className="shows text-left px-4 "
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="shows text-left px-4 "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/shop"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/WishList"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Wishlist
        </Link>
        {isLoggedIn && user?.isAdmin && (
          <Link
            to="/dashboard"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            to="/Login"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
