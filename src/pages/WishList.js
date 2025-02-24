// import { useState, useEffect } from "react";
import { useWishlist } from "../WishlistContext";
import { Link } from "react-router-dom"; // Ensure routing is set up

function WishList() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="col-lg-9">
          <div className="page-content my-account__wishlist">
            <div className="products-grid row row-cols-2 row-cols-lg-3" id="products-grid">
              {wishlist.map((item) => (
                <div key={item.id} className="product-card-wrapper">
                  <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                    <div className="pc__img-wrapper">
                      <div
                        className="swiper-container background-img js-swiper-slider"
                        data-settings="{&quot;resizeObserver&quot;: true}"
                      >
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <img
                              loading="lazy"
                              src={item.image}
                              width={330}
                              height={400}
                              alt={item.name}
                              className="pc__img"
                            />
                          </div>
                          {item.altImage && (
                            <div className="swiper-slide">
                              <img
                                loading="lazy"
                                src={item.altImage}
                                width={330}
                                height={400}
                                alt={item.name}
                                className="pc__img"
                              />
                            </div>
                          )}
                        </div>
                        <span className="pc__img-prev">
                          <svg width={7} height={11} viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_prev_sm" />
                          </svg>
                        </span>
                        <span className="pc__img-next">
                          <svg width={7} height={11} viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg">
                            <use href="#icon_next_sm" />
                          </svg>
                        </span>
                      </div>
                      <button onClick={() => removeFromWishlist(item.id)} className="btn-remove-from-wishlist">
                        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <use href="#icon_close" />
                        </svg>
                      </button>
                    </div>

                    {/* Product Details & Buttons */}
                    <div className="p-3 text-center">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">₦{item.price}</p>

                      <div className="flex justify-center gap-2 mt-3">
                        <Link to={`/item/${item.id}`}>
                          <button className="px-3 py-1 bg-green-500 text-black rounded-md">
                            View Item
                          </button>
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="px-3 py-1 bg-red-500 text-black rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;