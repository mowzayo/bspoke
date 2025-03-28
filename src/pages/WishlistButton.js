import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import "./WishlistButton.css";

function WishlistButton({ product, iconOnly = false }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useCart() || {};
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!product || !product._id) {
      console.warn("WishlistButton: Invalid product prop", product);
      setIsAdded(false);
      return;
    }
    if (!wishlist || !wishlist.items) {
      console.warn(
        "WishlistButton: Wishlist is undefined or missing items",
        wishlist
      );
      setIsAdded(false);
      return;
    }
    const added = wishlist.items.some((item) => {
      const productId = item.productId?._id || item.productId; // Handle ObjectId or string
      return productId?.toString() === product._id?.toString();
    });
    setIsAdded(added);
  }, [wishlist, product]);

  // Debug logs
  console.log("WishlistButton - iconOnly:", iconOnly);
  console.log("WishlistButton - Product:", product);
  console.log("WishlistButton - Wishlist:", wishlist);
  console.log("WishlistButton - Context:", {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  });

  if (!addToWishlist || !removeFromWishlist) {
    console.error("Wishlist functions are undefined. Check CartProvider.");
    return null;
  }

  const handleWishlistClick = () => {
    if (!product || !product._id) {
      alert(
        "Error: Product details are missing! Check the console for details."
      );
      console.error("Invalid product object:", product);
      return;
    }

    if (isAdded) {
      removeFromWishlist(product._id);
      setIsAdded(false);
    } else {
      addToWishlist(product);
      setIsAdded(true);
    }
  };

  return (
    <div
      onClick={handleWishlistClick}
      className={iconOnly ? "wishlist-icon cursor-pointer" : "wishlist-button"}
    >
      {isAdded ? (
        <FaHeart size={22} className="text-gray-500" />
      ) : (
        <FaRegHeart size={22} className="text-red-500" />
      )}
      {!iconOnly && (
        <span className="text-sm font-medium text-black">
          {isAdded ? "   Added to Wishlist" : "   Add to Wishlist"}
        </span>
      )}
    </div>
  );
}

export default WishlistButton;
