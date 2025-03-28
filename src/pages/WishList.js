import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import "./Wishlist.css";

function WishList() {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlist.items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="col-lg-9">
          <div className="page-content my-account__wishlist">
            <div
              className="products-grid row row-cols-2 row-cols-lg-3"
              id="products-grid"
            >
              {wishlist.items.map((item) => {
                console.log("WishList - Item:", JSON.stringify(item, null, 2));
                const imageSrc =
                  (item.productId.images && item.productId.images[0]) ||
                  item.productId.image ||
                  "/placeholder.jpg";
                return (
                  <div key={item._id} className="product-card-wrapper">
                    <div className="product-card">
                      <div className="pc__img-wrapper">
                        <div
                          className="swiper-container background-img js-swiper-slider"
                          data-settings='{"resizeObserver": true}'
                        >
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <img
                                loading="lazy"
                                src={imageSrc}
                                width={330}
                                height={400}
                                alt={item.productId.name || "Product"}
                                className="pc__img"
                              />
                            </div>
                          </div>
                          <span className="pc__img-prev">
                            <svg
                              width={7}
                              height={11}
                              viewBox="0 0 7 11"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_prev_sm" />
                            </svg>
                          </span>
                          <span className="pc__img-next">
                            <svg
                              width={7}
                              height={11}
                              viewBox="0 0 7 11"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_next_sm" />
                            </svg>
                          </span>
                        </div>
                        <WishlistButton product={item.productId} />
                        <button
                          onClick={() => removeFromWishlist(item.productId._id)}
                          className="remove-checkbox"
                        >
                          <span className="checkbox-inner"></span>
                        </button>
                      </div>

                      <div className="p-3">
                        <h2 className="text-lg font-semibold">
                          {item.productId.name || "Unnamed Product"}
                        </h2>
                        <p className="text-sm text-black-500">
                          ₦{item.productId.price || "N/A"}
                        </p>
                        <div className="fle">
                          {" "}
                          {/* Note: 'fle' seems to be a typo, should be 'flex' */}
                          <Link to={`/item/${item.productId._id}`}>
                            <button className="flexx bg-green-500 text-black rounded-md">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishList;
