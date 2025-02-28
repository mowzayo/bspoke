import { useState } from "react";
import { useWishlist } from "../WishlistContext";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import "./WishlistButton.css";

function WishlistButton({ product, iconOnly = false }) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  // Debug log to confirm prop
  console.log("WishlistButton - iconOnly:", iconOnly);

  if (!addToWishlist || !removeFromWishlist) {
    console.error("Wishlist functions are undefined. Check WishlistProvider.");
    return null;
  }

  const handleWishlistClick = () => {
    if (!product || !product.name || !product.price) {
      alert(
        "Error: Product details are missing! Check the console for details."
      );
      console.error("Invalid product object:", product);
      return;
    }

    if (isAdded) {
      removeFromWishlist(product.id);
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
