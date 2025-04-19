import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { ProductContext } from "../ProductContext";
import WishlistButton from "../pages/WishlistButton";
import "../pages/ShopPage.css";
import "./ComponentPage.css";

function CategoryPage() {
  const { products } = useContext(ProductContext);
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(
    window.matchMedia("(min-width: 768px)").matches ? 9 : 8
  );

  // Responsive products per page
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

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  const totalProducts = categoryProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
        {/* Sidebar (omitted for brevity) */}
        <div className="shop-list flex-grow-1">
          <h2 className="text-uppercase mb-4">{category}</h2>
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
                              <div className="out-of-stock-overlay absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
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
                                <div className="out-of-stock-overlay absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
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
              <p>No products available in this category.</p>
            )}
          </div>
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
                backgroundColor:
                  currentPage === totalPages ? "#ccc" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
