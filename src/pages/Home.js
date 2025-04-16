import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import WishlistButton from "./WishlistButton";

function Home() {
  const [products, setProducts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // Get the first 2 products for the slideshow
  const slideshowProducts = products.slice(0, 2);

  // Get the specific products for each collection
  const womenProduct = products[2]; // 3rd product
  const menProduct = products[3]; // 4th product
  const kidsProduct = products[4]; // 5th product
  const giftProduct = products[5]; // 6th product

  // Get the next 6 products for the grid (7th to 12th)
  const gridProducts = products.slice(6, 12);

  return (
    <div>
      {/* Slideshow with first 2 product images */}
      <div className="slideshow-container">
        {slideshowProducts.length > 0 ? (
          slideshowProducts.map((product) => (
            <img
              key={product._id}
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : ""
              }
              alt={product.name}
              className="slide"
            />
          ))
        ) : (
          <p></p>
        )}
      </div>

      {/* Collections with specific product images */}
      <div className="collections-container">
        <div
          className="collection-item women"
          style={{
            backgroundImage: `url(${
              womenProduct &&
              womenProduct.images &&
              womenProduct.images.length > 0
                ? womenProduct.images[0]
                : ""
            })`,
          }}
        >
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>SHIRT COLLECTION</h1>
            <button>
              <Link to="/ShopShirt">SHOP NOW</Link>
            </button>
          </div>
        </div>
        <div
          className="collection-item men"
          style={{
            backgroundImage: `url(${
              menProduct && menProduct.images && menProduct.images.length > 0
                ? menProduct.images[0]
                : ""
            })`,
          }}
        >
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>MEN COLLECTION</h1>
            <button>
              <Link to="/ShopMen">SHOP NOW</Link>
            </button>
          </div>
        </div>
        <div
          className="collection-item kids"
          style={{
            backgroundImage: `url(${
              kidsProduct && kidsProduct.images && kidsProduct.images.length > 0
                ? kidsProduct.images[0]
                : ""
            })`,
          }}
        >
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>PANTS COLLECTION</h1>
            <button>
              <Link to="/ShopPants">SHOP NOW</Link>
            </button>
          </div>
        </div>
        <div
          className="collection-item gift"
          style={{
            backgroundImage: `url(${
              giftProduct && giftProduct.images && giftProduct.images.length > 0
                ? giftProduct.images[0]
                : ""
            })`,
          }}
        >
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>E-GIFT CARDS</h1>
            <p>Surprise someone with the gift they really want.</p>
            <button>
              <Link to="/category/gift">SHOP NOW</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Product grid for the next 6 products */}
      <div className="product-grid">
        {gridProducts.length > 0 ? (
          gridProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <div className="product-image">
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : ""
                  }
                  alt={product.name}
                />
                <div className="overlay">
                  <WishlistButton product={product} />
                  <button>
                    <Link to={`/item/${product._id}`} className="view-details">
                      View
                    </Link>
                  </button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">₦{product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products available for the grid</p>
        )}
      </div>
    </div>
  );
}

export default Home;
