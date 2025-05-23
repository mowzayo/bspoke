// src/components/ShopPants.js
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { useCart } from "../CartContext";
import { ProductContext } from "../ProductContext";
import "./ShopPage.css";
import bvideo from "../assets/bvideo.mp4";
import WishlistButton from "./WishlistButton";

function ShopPants() {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    window.matchMedia("(min-width: 768px)").matches ? 9 : 8
  );
  const { addToWishlist } = useCart();

  // Responsive pagination
  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(
        window.matchMedia("(min-width: 768px)").matches ? 9 : 8
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter products for "pants" category
  const pantsProducts = products.filter(
    (product) => product?.category?.toLowerCase() === "pants"
  );

  // Pagination logic
  const totalProducts = pantsProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = pantsProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleProductClick = (product) => {
    if (product.outOfStock) {
      alert("This product is out of stock.");
      return false;
    }
    return true;
  };

  return (
    <div className="shop-page">
      <div className="mb-5 pb-xl-5" />
      <div className="shop-main container d-flex pt-4 pt-xl-5">
        {/* Sidebar (same as ShopShirt, omitted for brevity) */}
        <div className="shop-sidebar side-sticky bg-body" id="shopFilter">
          <div className="aside-header d-flex d-lg-none align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
            <button className="btn-close-lg js-close-aside btn-close-aside ms-auto" />
          </div>
          <div className="pt-4 pt-lg-0" />
          <div className="accordion" id="categories-list">
            <div className="accordion-item mb-4 pb-3">
              <h5 className="accordion-header" id="accordion-heading-11">
                <button
                  className="accordion-button p-0 border-0 fs-5 text-uppercase"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-filter-1"
                  aria-expanded="true"
                  aria-controls="accordion-filter-1"
                >
                  Product Categories
                  <svg
                    className="accordion-button__icon type2"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g aria-hidden="true" stroke="none" fillRule="evenodd">
                      <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" />
                    </g>
                  </svg>
                </button>
              </h5>
              <div
                id="accordion-filter-1"
                className="accordion-collapse collapse show border-0"
                aria-labelledby="accordion-heading-11"
                data-bs-parent="#categories-list"
              >
                <div className="accordion-body px-0 pb-0 pt-3">
                  <ul className="list list-inline mb-0">
                    <li className="list-item">
                      <Link to="/dresses" className="menu-link py-1">
                        Dresses
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/shorts" className="menu-link py-1">
                        Shorts
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/sweatshirts" className="menu-link py-1">
                        Sweatshirts
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/swimwear" className="menu-link py-1">
                        Swimwear
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/jackets" className="menu-link py-1">
                        Jackets
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/tshirts-tops" className="menu-link py-1">
                        T-Shirts & Tops
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/jeans" className="menu-link py-1">
                        Jeans
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/trousers" className="menu-link py-1">
                        Trousers
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/men" className="menu-link py-1">
                        Men
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/jumpers-cardigans" className="menu-link py-1">
                        Jumpers & Cardigans
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/shirt" className="menu-link py-1">
                        Shirts
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link to="/pants" className="menu-link py-1">
                        Pants
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion" id="size-filters">
            <div className="accordion-item mb-4 pb-3">
              <h5 className="accordion-header" id="accordion-heading-size">
                <button
                  className="accordion-button p-0 border-0 fs-5 text-uppercase"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#accordion-filter-size"
                  aria-expanded="true"
                  aria-controls="accordion-filter-size"
                >
                  Sizes
                  <svg
                    className="accordion-button__icon type2"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g aria-hidden="true" stroke="none" fillRule="evenodd">
                      <path d="M5.35668 0.159286C5.16235 -0.053094 4.83769 -0.0530941 4.64287 0.159286L0.147611 5.05963C-0.0492049 5.27473 -0.049205 5.62357 0.147611 5.83813C0.344427 6.05323 0.664108 6.05323 0.860924 5.83813L5 1.32706L9.13858 5.83867C9.33589 6.05378 9.65507 6.05378 9.85239 5.83867C10.0492 5.62357 10.0492 5.27473 9.85239 5.06018L5.35668 0.159286Z" />
                    </g>
                  </svg>
                </button>
              </h5>
              <div
                id="accordion-filter-size"
                className="accordion-collapse collapse show border-0"
                aria-labelledby="accordion-heading-size"
                data-bs-parent="#size-filters"
              >
                <div className="accordion-body px-0 pb-0">
                  <div className="d-flex flex-wrap">
                    <Link
                      to="/size/xs"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      XS
                    </Link>
                    <Link
                      to="/size/s"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      S
                    </Link>
                    <Link
                      to="/size/m"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      M
                    </Link>
                    <Link
                      to="/size/l"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      L
                    </Link>
                    <Link
                      to="/size/xl"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      XL
                    </Link>
                    <Link
                      to="/size/xxl"
                      className="swatch-size btn btn-sm btn-outline-light mb-3 me-3 js-filter"
                    >
                      XXL
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="shop-list flex-grow-1">
          {/* Slideshow */}
          <div
            className="swiper-container js-swiper-slider slideshow slideshow_small"
            data-settings='{"autoplay": {"delay": 5000}, "slidesPerView": 1, "effect": "fade", "loop": true, "pagination": {"el": ".slideshow-pagination", "type": "bullets", "clickable": true}}'
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div
                  className="overflow-hidden position-relative h-48 md:h-64"
                  style={{ backgroundColor: "#eee" }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={bvideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="slideshow-character position-absolute bottom-0 pos_right-center">
                    <img
                      loading="lazy"
                      src="https://uomo-html.flexkitux.com/images/slideshow-character1.png"
                      width={246}
                      height={450}
                      alt="Pants Fashion 1"
                      className="slideshow-character__img animate animate_fade animate_btt animate_delay-9 w-auto h-auto"
                    />
                    <div className="character_markup">
                      <p className="font-special text-uppercase animate animate_fade animate_rtl animate_delay-10">
                        Pants
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div
                  className="overflow-hidden position-relative h-48 md:h-64"
                  style={{ backgroundColor: "#eee" }}
                >
                  <div className="slideshow-character position-absolute bottom-0 pos_right-center">
                    <img
                      loading="lazy"
                      src="https://uomo-html.flexkitux.com/images/slideshow-character2.png"
                      width={261}
                      height={450}
                      alt="Pants Fashion 2"
                      className="slideshow-character__img animate animate_fade animate_btt animate_delay-9 w-auto h-auto"
                    />
                  </div>
                  <div className="slideshow-text container position-absolute start-50 top-50 translate-middle p-3 p-xl-5">
                    <h6 className="text_dash text-uppercase text-red fs-base fw-medium animate animate_fade animate_btt animate_delay-3">
                      Pants 2024
                    </h6>
                    <h2 className="text-uppercase page-title fw-bold animate animate_fade animate_btt animate_delay-3">
                      Pants Collection
                    </h2>
                    <h6 className="text-uppercase mb-3 animate animate_fade animate_btt animate_delay-3">
                      Limited Time Offer - Up to 60% off & Free Shipping
                    </h6>
                    <Link
                      to="/pants"
                      className="btn-link btn-link_lg text-uppercase fw-medium animate animate_fade animate_btt animate_delay-3"
                    >
                      Discover More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 p-xl-5">
              <div className="slideshow-pagination d-flex align-items-center position-absolute bottom-0 mb-4" />
            </div>
          </div>

          <div className="mb-3 pb-2 pb-xl-3" />
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
              <Link
                to="/"
                className="menu-link menu-link_us-s text-uppercase fw-medium"
              >
                Home
              </Link>
              <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
                /
              </span>
              <Link
                to="/pants"
                className="menu-link menu-link_us-s text-uppercase fw-medium"
              >
                Pants Collection
              </Link>
            </div>
          </div>

          <div className="mb-3 pb-2 pb-xl-3" />

          {/* Product Grid */}
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div className="product-card-wrapper" key={product._id}>
                  <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                    <div className="pc__img-wrapper relative">
                      <div className="swiper-container background-img js-swiper-slider">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <Link
                              to={
                                product.outOfStock
                                  ? "#"
                                  : `/item/${product._id}`
                              }
                              onClick={() => handleProductClick(product)}
                            >
                              <img
                                loading="lazy"
                                src={
                                  Array.isArray(product.images) &&
                                  product.images.length > 0
                                    ? product.images[0]
                                    : "/path/to/fallback-image.jpg"
                                }
                                alt={product.name}
                                className="pc__img w-full h-64 object-cover"
                              />
                            </Link>
                            {product.outOfStock && (
                              <div className="out-of-stock-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium">
                                Out of Stock
                              </div>
                            )}
                          </div>
                          {product.images && product.images[1] && (
                            <div className="swiper-slide">
                              <Link
                                to={
                                  product.outOfStock
                                    ? "#"
                                    : `/item/${product._id}`
                                }
                                onClick={() => handleProductClick(product)}
                              >
                                <img
                                  loading="lazy"
                                  src={product.images[1]}
                                  alt={`${product.name} alt`}
                                  className="pc__img w-full h-64 object-cover"
                                />
                              </Link>
                              {product.outOfStock && (
                                <div className="out-of-stock-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium">
                                  Out of Stock
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {!product.outOfStock && (
                          <>
                            <span className="pc__img-prev">
                              <svg width={7} height={11} viewBox="0 0 7 11">
                                <use href="#icon_prev_sm" />
                              </svg>
                            </span>
                            <span className="pc__img-next">
                              <svg width={7} height={11} viewBox="0 0 7 11">
                                <use href="#icon_next_sm" />
                              </svg>
                            </span>
                          </>
                        )}
                      </div>
                      {!product.outOfStock ? (
                        <Link
                          to={`/item/${product._id}`}
                          className="view-page absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 text-sm font-medium"
                        >
                          View Page
                        </Link>
                      ) : (
                        <div
                          onClick={() => handleProductClick(product)}
                          className="view-page absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 text-sm font-medium cursor-pointer"
                        >
                          View Page
                        </div>
                      )}
                    </div>
                    <div className="pc__info">
                      <div className="pc__header flex justify-between items-center">
                        <WishlistButton
                          product={product}
                          iconOnly
                          disabled={product.outOfStock}
                        />
                        <div className="product-card__price d-flex">
                          {product.oldPrice && (
                            <span className="money price price-old">
                              ₦{product.oldPrice}
                            </span>
                          )}
                          <span className="money price price-sale">
                            ₦{product.price}
                          </span>
                        </div>
                      </div>
                      <h6 className="pc__title">
                        {product.outOfStock ? (
                          <span>{product.name}</span>
                        ) : (
                          <Link to={`/item/${product._id}`}>
                            {product.name}
                          </Link>
                        )}
                      </h6>
                      {product.outOfStock && (
                        <p className="out-of-stock-text text-red-500 text-sm mt-2">
                          Out of Stock
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No pants available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div
        className="pagination"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShopPants;
