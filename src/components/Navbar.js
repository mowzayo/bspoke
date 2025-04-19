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
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  const toggleShopDropdown = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setIsShopDropdownOpen((prev) => {
      console.log("Toggling Shop Dropdown. New state:", !prev); // Debug log
      return !prev;
    });
  };

  const closeShopDropdown = () => {
    setIsShopDropdownOpen(false);
    setMenuOpen(false);
  };

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

  const handleMouseEnter = () => {
    setShowCart((prev) => !prev);
  };

  const handleMouseLeave = () => {
    // No action needed for click-based toggle
  };

  const handleRemoveFromCart = (e, productId, size) => {
    e.stopPropagation();
    removeFromCart(productId, size);
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
            onClick={handleMouseEnter}
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
                      const imageSrc =
                        (item.images && item.images[0]) ||
                        item.image ||
                        "/placeholder.jpg";

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
                              ₦{(item.price * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                          <span
                            className="remove-btn"
                            onClick={(e) =>
                              handleRemoveFromCart(e, item.productId, item.size)
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
                    className="shows text-left px-4"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="shows text-left px-4"
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
        <div
          className={`nav-link shop-dropdown ${
            isShopDropdownOpen ? "open" : ""
          }`}
          onClick={toggleShopDropdown}
          onMouseEnter={() => setIsShopDropdownOpen(true)}
          onMouseLeave={() => setIsShopDropdownOpen(false)}
        >
          <span>
            Shop
            <svg
              className={`dropdown-icon ${isShopDropdownOpen ? "rotate" : ""}`}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {isShopDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/ShopMen"
                className="dropdown-item"
                onClick={closeShopDropdown}
              >
                Men
              </Link>
              <Link
                to="/ShopShirt"
                className="dropdown-item"
                onClick={closeShopDropdown}
              >
                Shirt
              </Link>
              <Link
                to="/ShopPants"
                className="dropdown-item"
                onClick={closeShopDropdown}
              >
                Pants
              </Link>
              <Link
                to="/kids"
                className="dropdown-item"
                onClick={closeShopDropdown}
              >
                Kids
              </Link>
              <Link
                to="/shop"
                className="dropdown-item"
                onClick={closeShopDropdown}
              >
                All Products
              </Link>
            </div>
          )}
        </div>
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
