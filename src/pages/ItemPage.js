import { useState, useEffect, useCallback } from "react";
import { useCart } from "../CartContext";
import { useParams } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import { getProductById } from "./Utils";
import "./ItemPage.css";

function ItemPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(Number(productId));
        if (!fetchedProduct) {
          console.error("Product not found for ID:", productId);
          return;
        }
        console.log("Fetched product:", fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSizeSelect = (size) => {
    if (selectedSize !== size) {
      // Prevent double trigger
      console.log("Size selected:", size);
      setSelectedSize(size);
    }
  };

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      if (!product) {
        console.warn("No product to add to cart.");
        return;
      }

      if (!selectedSize || quantity <= 0) {
        alert("Please select a size and a valid quantity.");
        return;
      }

      const formattedPrice =
        typeof product.price === "string"
          ? parseFloat(product.price.replace("$", "").trim()) || 0
          : product.price || 0;

      const productWithSelection = {
        ...product,
        id: product.id || `temp-${productId}`,
        size: selectedSize,
        quantity: Number(quantity),
        price: formattedPrice,
      };

      setIsAddingToCart(true);
      addToCart(productWithSelection);
      setIsAddingToCart(false);

      // Reset body overflow in case js-open-aside locked it
      document.body.style.overflow = "auto";
    },
    [selectedSize, quantity, product, addToCart, productId]
  );

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="row">
      <div className="col-lg-7">
        <div className="product-single__media">
          <div className="product-single__image">
            <img src={product.image} alt={product.name} className="shopimg" />
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="mb-lg-5 pb-lg-5"></div>
        <h2 className="product-single__name">{product.name}</h2>
        <div className="product-single__price">
          <p className="current-price">₦{product.price}</p>
        </div>
        <p className="product-single__short-desc">{product.description}</p>
        <div>
          <div className="product-single__swatches">
            <div className="product-swatch text-swatches">
              <label className="h6">Sizes</label>
              <div className="swatch-list">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label
                    key={size}
                    className={`swatch js-swatch ${selectedSize === size ? "selected" : ""}`}
                    title={size}
                    onClick={() => handleSizeSelect(size)}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSizeSelect(size);
                      }}
                      style={{ display: "none" }}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="product-single__addtocart">
            <div className="qty-control position-relative">
              <button
                type="button"
                className="qty-control__reduce"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                value={quantity}
                min={1}
                className="qty-control__number text-center"
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (!isNaN(newQuantity) && newQuantity >= 1) {
                    setQuantity(newQuantity);
                  }
                }}
              />
              <button
                type="button"
                className="qty-control__increase"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-addtocart" // Removed js-open-aside
              disabled={isAddingToCart}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
        <div className="product-single__addtolinks">
          <WishlistButton product={product} />
        </div>
      </div>
      <div className="product-single__details-tab">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore active"
              id="tab-description-tab"
              data-bs-toggle="tab"
              href="#tab-description"
              role="tab"
              aria-controls="tab-description"
              aria-selected="false"
            >
              Description
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore"
              id="tab-additional-info-tab"
              data-bs-toggle="tab"
              href="#tab-additional-info"
              role="tab"
              aria-controls="tab-additional-info"
              aria-selected="false"
            >
              Additional Information
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore"
              id="tab-reviews-tab"
              data-bs-toggle="tab"
              href="#tab-reviews"
              role="tab"
              aria-controls="tab-reviews"
              aria-selected="false"
            >
              Reviews (2)
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="tab-description"
            role="tabpanel"
            aria-labelledby="tab-description-tab"
          >
            <div className="product-single__description">
              <h3 className="block-title mb-4">
                Sed do eiusmod tempor incididunt ut labore
              </h3>
              <p className="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <div className="row">
                <div className="col-lg-6">
                  <h3 className="block-title">Why choose product?</h3>
                  <ul className="list text-list">
                    <li>Creat by cotton fibric with soft and smooth</li>
                    <li>
                      Simple, Configurable (e.g. size, color, etc.), bundled
                    </li>
                    <li>Downloadable/Digital Products, Virtual Products</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <h3 className="block-title">Sample Number List</h3>
                  <ol className="list text-list">
                    <li>Create Store-specific attrittbutes on the fly</li>
                    <li>
                      Simple, Configurable (e.g. size, color, etc.), bundled
                    </li>
                    <li>Downloadable/Digital Products, Virtual Products</li>
                  </ol>
                </div>
              </div>
              <h3 className="block-title mb-0">Lining</h3>
              <p className="content">100% Polyester, Main: 100% Polyester.</p>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="tab-additional-info"
            role="tabpanel"
            aria-labelledby="tab-additional-info-tab"
          >
            <div className="product-single__addtional-info">
              <div className="item">
                <label className="h6">Weight</label>
                <span>1.25 kg</span>
              </div>
              <div className="item">
                <label className="h6">Dimensions</label>
                <span>90 x 60 x 90 cm</span>
              </div>
              <div className="item">
                <label className="h6">Size</label>
                <span>XS, S, M, L, XL</span>
              </div>
              <div className="item">
                <label className="h6">Color</label>
                <span>Black, Orange, White</span>
              </div>
              <div className="item">
                <label className="h6">Storage</label>
                <span>Relaxed fit shirt-style dress with a rugged</span>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="tab-reviews"
            role="tabpanel"
            aria-labelledby="tab-reviews-tab"
          >
            <h2 className="product-single__reviews-title">Reviews</h2>
            <div className="product-single__reviews-list">
              <div className="product-single__reviews-item">
                <div className="customer-avatar">
                  <img
                    loading="lazy"
                    src="https://uomo-html.flexkitux.com/images/avatar.jpg"
                    alt=""
                  />
                </div>
                <div className="customer-review">
                  <div className="customer-name">
                    <h6>Janice Miller</h6>
                    <div className="reviews-group d-flex">
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                    </div>
                  </div>
                  <div className="review-date">April 06, 2023</div>
                  <div className="review-text">
                    <p>
                      Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat
                      facere possimus, omnis voluptas assumenda est…
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-single__reviews-item">
                <div className="customer-avatar">
                  <img
                    loading="lazy"
                    src="https://uomo-html.flexkitux.com/images/avatar.jpg"
                    alt=""
                  />
                </div>
                <div className="customer-review">
                  <div className="customer-name">
                    <h6>Benjam Porter</h6>
                    <div className="reviews-group d-flex">
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                      <svg
                        className="review-star"
                        viewBox="0 0 9 9"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_star" />
                      </svg>
                    </div>
                  </div>
                  <div className="review-date">April 06, 2023</div>
                  <div className="review-text">
                    <p>
                      Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat
                      facere possimus, omnis voluptas assumenda est…
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-single__review-form">
              <form name="customer-review-form">
                <h5>Be the first to review “Message Cotton T-Shirt”</h5>
                <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <div className="select-star-rating">
                  <label>Your rating *</label>
                  <span className="star-rating">
                    <svg
                      className="star-rating__star-icon"
                      width={12}
                      height={12}
                      fill="#ccc"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                    </svg>
                    <svg
                      className="star-rating__star-icon"
                      width={12}
                      height={12}
                      fill="#ccc"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                    </svg>
                    <svg
                      className="star-rating__star-icon"
                      width={12}
                      height={12}
                      fill="#ccc"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                    </svg>
                    <svg
                      className="star-rating__star-icon"
                      width={12}
                      height={12}
                      fill="#ccc"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                    </svg>
                    <svg
                      className="star-rating__star-icon"
                      width={12}
                      height={12}
                      fill="#ccc"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                    </svg>
                  </span>
                  <input type="hidden" id="form-input-rating" defaultValue />
                </div>
                <div className="mb-4">
                  <textarea
                    id="form-input-review"
                    className="form-control form-control_gray"
                    placeholder="Your Review"
                    cols={30}
                    rows={8}
                    defaultValue={""}
                  />
                </div>
                <div className="form-label-fixed mb-4">
                  <label htmlFor="form-input-name" className="form-label">
                    Name *
                  </label>
                  <input
                    id="form-input-name"
                    className="form-control form-control-md form-control_gray"
                  />
                </div>
                <div className="form-label-fixed mb-4">
                  <label htmlFor="form-input-email" className="form-label">
                    Email address *
                  </label>
                  <input
                    id="form-input-email"
                    className="form-control form-control-md form-control_gray"
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input form-check-input_fill"
                    type="checkbox"
                    defaultValue
                    id="remember_checkbox"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="remember_checkbox"
                  >
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </label>
                </div>
                <div className="form-action">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      .
    </div>
  );
}

export default ItemPage;
