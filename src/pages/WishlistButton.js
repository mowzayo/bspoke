import { useState } from "react";
import { useWishlist } from "../WishlistContext";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

function WishlistButton({ product }) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  if (!addToWishlist || !removeFromWishlist) {
    console.error("Wishlist functions are undefined. Check WishlistProvider.");
    return null;
  }

  const handleWishlistClick = () => {
    if (!product || !product.name || !product.price) {
      alert("Error: Product details are missing! Check the console for details.");
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
    className="flex items-center space-x-3 cursor-pointer border border-gray-400 rounded-full px-4 py-2 bg-white transition-all duration-300"
  >
    {/* Icon */}
    {isAdded ? (
      <FaHeart size={22} className="text-gray-500 transition-all duration-300" />
    ) : (
      <FaRegHeart size={22} className="text-red-500 transition-all duration-300" />
    )}

    {/* Text */}
    <span className="text-sm font-medium text-black">
      {isAdded ? "   Added to Wishlist" : "   Add to Wishlist"}
    </span>
  </div>
  );
}

export default WishlistButton;
