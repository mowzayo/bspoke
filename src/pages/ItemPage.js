import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../CartContext';
import { useParams } from 'react-router-dom';
import WishlistButton from "./WishlistButton"; 
import { getProductById } from './Utils';
import './ItemPage.css';

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
    if (selectedSize !== size) { // Prevent double trigger
      console.log("Size selected:", size);
      setSelectedSize(size);
    }
  };

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    if (!product) {
      console.warn("No product to add to cart.");
      return;
    }

    if (!selectedSize || quantity <= 0) {
      alert("Please select a size and a valid quantity.");
      return;
    }

    const formattedPrice = typeof product.price === "string"
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
    document.body.style.overflow = 'auto';
  }, [selectedSize, quantity, product, addToCart, productId]);

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
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <label
                    key={size}
                    className={`swatch js-swatch ${selectedSize === size ? 'selected' : ''}`}
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
                      style={{ display: 'none' }}
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
    </div>
  );
}

export default ItemPage;