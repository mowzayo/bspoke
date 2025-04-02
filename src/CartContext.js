import React, { createContext, useContext, useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
console.log("CartContext API_URL:", API_URL);
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState({ items: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        setWishlist({
          items: JSON.parse(localStorage.getItem("wishlist")) || [],
        });
        setUser(null);
        setIsLoggedIn(false);
        return;
      }

      try {
        const sessionResponse = await fetch(
          `${API_URL}/api/auth/check-session`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          setUser(sessionData.user);
          setIsLoggedIn(true);
          setCart(sessionData.cart || []);

          const localWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          if (localWishlist.length > 0) {
            for (const item of localWishlist) {
              await fetch(`${API_URL}/api/wishlist/add`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: item.productId._id }),
              });
            }
            localStorage.removeItem("wishlist");
          }

          const wishlistResponse = await fetch(`${API_URL}/api/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!wishlistResponse.ok) {
            console.warn(
              "Falling back to session wishlist:",
              sessionData.wishlist
            );
            setWishlist({ items: sessionData.wishlist || [] });
            throw new Error("Failed to fetch wishlist");
          }
          const wishlistData = await wishlistResponse.json();
          setWishlist({ items: wishlistData.items || [] });
        } else {
          setToken(null);
          localStorage.removeItem("token");
          setCart(JSON.parse(localStorage.getItem("cart")) || []);
          setWishlist({
            items: JSON.parse(localStorage.getItem("wishlist")) || [],
          });
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setToken(null);
        localStorage.removeItem("token");
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        setWishlist({
          items: JSON.parse(localStorage.getItem("wishlist")) || [],
        });
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn) {
      const timeout = setTimeout(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("wishlist", JSON.stringify(wishlist.items));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [cart, wishlist, isLoggedIn]);

  const addToCart = async (product) => {
    const { id, size, quantity = 1, name, price, image, images } = product;
    try {
      const response = await fetch(`${API_URL}/api/auth/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, size, quantity }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add to cart");
      setCart(data.cart);
    } catch (err) {
      console.error("Add to cart error:", err);
      const existingItem = cart.find(
        (item) => item.productId === id && item.size === size
      );
      const cartImage =
        images && images.length > 0 ? images[0] : image || "/placeholder.jpg";
      const updatedCart = existingItem
        ? cart.map((item) =>
            item.productId === id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [
            ...cart,
            { productId: id, size, quantity, name, price, image: cartImage },
          ];
      setCart(updatedCart);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const currentItem = cart.find(
        (item) => item.productId === productId && item.size === size
      );
      const response = await fetch(`${API_URL}/api/auth/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size,
          quantity: -currentItem.quantity,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to remove from cart");
      setCart(data.cart);
    } catch (err) {
      console.error("Remove from cart error:", err);
      const updatedCart = cart.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      setCart(updatedCart);
    }
  };

  const updateQuantity = async (productId, size, newQuantity) => {
    try {
      const currentItem = cart.find(
        (item) => item.productId === productId && item.size === size
      );
      const quantityDiff = newQuantity - currentItem.quantity;
      const response = await fetch(`${API_URL}/api/auth/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size, quantity: quantityDiff }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update quantity");
      setCart(data.cart);
    } catch (err) {
      console.error("Update quantity error:", err);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: Math.max(parseInt(newQuantity) || 1, 1) }
            : item
        )
      );
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clear: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to clear cart");
      setCart([]);
    } catch (err) {
      console.error("Clear cart error:", err);
      setCart([]);
    }
  };

  const addToWishlist = async (product) => {
    try {
      if (isLoggedIn) {
        const response = await fetch(`${API_URL}/api/wishlist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add to wishlist: ${errorText}`);
        }
        const updatedWishlist = await response.json();
        setWishlist({ items: updatedWishlist.items || [] });
      } else {
        const existingItem = wishlist.items.find(
          (item) => item.productId._id === product._id
        );
        if (!existingItem) {
          const image =
            product.images && product.images.length > 0
              ? product.images[0]
              : product.image || "/placeholder.jpg";
          const updatedItems = [
            ...wishlist.items,
            {
              productId: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: image,
              },
              _id: `local-${Date.now()}`,
              addedAt: new Date().toISOString(),
            },
          ];
          setWishlist({ items: updatedItems });
        }
      }
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      if (isLoggedIn) {
        const response = await fetch(`${API_URL}/api/wishlist/remove`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to remove from wishlist: ${errorText}`);
        }
        const updatedWishlist = await response.json();
        setWishlist({ items: updatedWishlist.items || [] });
      } else {
        const updatedItems = wishlist.items.filter(
          (item) => item.productId._id !== productId
        );
        setWishlist({ items: updatedItems });
      }
    } catch (err) {
      console.error("Remove from wishlist error:", err);
    }
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem("token");
    setCart([]);
    setWishlist({ items: [] });
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("cart");
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          offlineCart: cart,
          offlineWishlist: wishlist.items,
        }),
      });
      const data = await response.json();
      console.log("Login response from server:", data);
      if (!response.ok) throw new Error(data.message || "Login failed");

      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsLoggedIn(true);
      setCart(data.cart || []);
      setWishlist({ items: data.wishlist || [] });
      console.log("Token set:", data.token);
      console.log("User set:", data.user);
      console.log("isLoggedIn set:", true);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        user,
        isLoggedIn,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        logout,
        login,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
