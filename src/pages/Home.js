import React from "react";
import { Link } from "react-router-dom"; // Add this import at the top of your file
import header from "../assets/header.jpg";
import header1 from "../assets/header1.jpg";
// import header2 from '../assets/header2.jpg'
import "./Home.css";
// import { getProductById } from './Utils'; // Adjust path to where utils.js is located
import { products } from "./Utils"; // Adjust the path if necessary
// import { useCart } from '../CartContext';
// import { useParams } from 'react-router-dom';
import WishlistButton from "./WishlistButton";

function Home() {
  // const { productId } = useParams(); // Get product ID from URL
  //const navigate = useNavigate(); // ✅ Hook for navigation
  //const { addToCart } = useCart(); // ✅ Hook for cart functionality

  //const handleAddToCart = (product) => {
  // addToCart(product); // ✅ Add item to cart
  //navigate('/cart'); // ✅ Redirect to cart page
  //};

  return (
    <div>
      <div className="h4">
        <h4>Welcome to Bspoke Store</h4>
      </div>

      <div className="slideshow-container">
        <img src={header} alt="hed 1" className="slide" />
        <img src={header1} alt="hed 2" className="slide" />
      </div>

      <div className="collections-container">
        <div className="collection-item women">
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>WOMEN COLLECTION</h1>
            <button>SHOP NOW</button>
          </div>
        </div>
        <div className="collection-item men">
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>MEN COLLECTION</h1>
            <button>SHOP NOW</button>
          </div>
        </div>
        <div className="collection-item kids">
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>KIDS COLLECTION</h1>
            <button>SHOP NOW</button>
          </div>
        </div>
        <div className="collection-item gift">
          <div className="collection-content">
            <h4>HOT LIST</h4>
            <h1>E-GIFT CARDS</h1>
            <p>Surprise someone with the gift they really want.</p>
            <button>SHOP NOW</button>
          </div>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="overlay">
                {/*}  <button onClick={() => handleAddToCart(product)}>Add to Cart</button> */}
                <WishlistButton product={product} />{" "}
                {/* ✅ Pass full product object */}
                {/* Link to the Shop Page with the product ID */}
                <button className="vie">
                  {" "}
                  <Link to={`/item/${product.id}`} className="view-details">
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
        ))}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="overlay">
                {/*}  <button onClick={() => handleAddToCart(product)}>Add to Cart</button> */}
                <WishlistButton product={product} />
                {/* Link to the Shop Page with the product ID */}
                <button>
                  <Link to={`/item/${product.id}`} className="view-details">
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
        ))}
      </div>
    </div>
  );
}

export default Home;
