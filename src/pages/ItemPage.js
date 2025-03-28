import { useState, useEffect, useCallback } from "react";
import { useCart } from "../CartContext";
import { useParams } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import "./ItemPage.css";

function ItemPage() {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const fetchedProduct = await response.json();
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
      console.log("Size selected:", size);
      setSelectedSize(size);
    }
  };

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      if (!product || isAddingToCart) {
        console.warn("No product or already adding to cart.");
        return;
      }

      if (!selectedSize || quantity <= 0) {
        alert("Please select a size and a valid quantity.");
        return;
      }

      const formattedPrice =
        typeof product.price === "string"
          ? parseFloat(product.price.replace("₦", "").trim()) || 0
          : product.price || 0;

      const productWithSelection = {
        ...product,
        id: product._id,
        size: selectedSize,
        quantity: Number(quantity),
        price: formattedPrice,
      };

      console.log("Adding to cart:", productWithSelection);
      setIsAddingToCart(true);
      setShowPrompt(true);

      addToCart(productWithSelection);

      setTimeout(() => {
        setIsAddingToCart(false);
        setShowPrompt(false);
      }, 2000);

      document.body.style.overflow = "auto";
    },
    [selectedSize, quantity, product, addToCart, isAddingToCart]
  );

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="row container mx-auto p-4">
      <div className="col-lg-7">
        <div className="product-single__media">
          <div className="product-single__image">
            <img
              src={Array.isArray(product.images) ? product.images[0] : ""}
              alt={product.name}
              className="shopimg w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="mb-lg-5 pb-lg-5"></div>
        <h2 className="product-single__name text-2xl font-bold mb-2">
          {product.name}
        </h2>
        <div className="product-single__price">
          <p className="current-price text-lg mt-0">₦{product.price}</p>
        </div>

        {/* Size Selection */}
        <div className="product-single__swatches mt-3ss">
          <div className="product-swatch text-swatches">
            <label className="h6 mb-1">Sizes</label>{" "}
            {/* Added mb-1 for tighter spacing */}
            <div className="swatch-list flex flex-wrap gap-1">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <label
                  key={size}
                  className={`swatch js-swatch px-3 py-1 rounded cursor-pointer ${
                    selectedSize === size
                      ? "selected bg-gray-500 text-white"
                      : "bg-gray-200"
                  }`}
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

        {/* Quantity and Add to Cart */}
        <div className="product-single__addtocart mt-4">
          <div className="qty-control position-relative flex items-center space-x-2">
            <button
              type="button"
              className="qty-control__reduce bg-gray-300 px-2 py-1 rounded"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <input
              type="number"
              name="quantity"
              value={quantity}
              min={1}
              className="qty-control__number text-center w-16 border p-1"
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (!isNaN(newQuantity) && newQuantity >= 1) {
                  setQuantity(newQuantity);
                }
              }}
            />
            <button
              type="button"
              className="qty-control__increase bg-gray-300 px-2 py-1 rounded"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-addtocart ml-4 px-4 py-2"
            disabled={isAddingToCart}
            onClick={handleAddToCart}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>

          {showPrompt && (
            <div
              className="cart-prompt"
              style={{
                position: "fixed",
                top: "130px",
                left: "50%",
                width: "100%",
                transform: "translateX(-50%)",
                color: "green",
                backgroundColor: "#d4edda",
                padding: "5px 10px",
                borderRadius: "4px",
                zIndex: 10,
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              Added to Cart!
            </div>
          )}
        </div>

        <div className="product-single__addtolinks mt-1">
          <WishlistButton product={product} />
        </div>
      </div>

      {/* Tabs */}
      <div className="product-single__details-tab mt-2 ">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link nav-link_underscore active"
              id="tab-description-tab"
              data-bs-toggle="tab"
              href="#tab-description"
              role="tab"
              aria-controls="tab-description"
              aria-selected="true"
            >
              Description
            </a>
          </li>
          <li className="nav-item">
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
              id="tab-size-guide-tab"
              data-bs-toggle="tab"
              href="#tab-size-guide"
              role="tab"
              aria-controls="tab-size-guide"
              aria-selected="false"
            >
              Size Guide
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
              <h3 className="block-title mb-4">{product.name} Overview</h3>
              <p className="content">
                {product.description || "No detailed description available."}
              </p>
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
                <span>{product.weight || "N/A"}</span>
              </div>
              <div className="item">
                <label className="h6">Dimensions</label>
                <span>{product.dimensions || "N/A"}</span>
              </div>
              <div className="item">
                <label className="h6">Sizes</label>
                <span>{product.sizes.join(", ")}</span>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="tab-size-guide"
            role="tabpanel"
            aria-labelledby="tab-size-guide-tab"
          >
            <div className="size-guide">
              <h3 className="block-title mb-4">Size Guide</h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="font-semibold">SIZE</div>
                <div className="font-semibold">XS</div>
                <div className="font-semibold">S</div>
                <div className="font-semibold">M</div>
                <div className="font-semibold">L</div>
                <div className="font-semibold">XL</div>
                <div className="font-semibold">XXL</div>

                <div className="font-semibold">BODY LENGTH</div>
                <div>27</div>
                <div>28</div>
                <div>29</div>
                <div>30</div>
                <div>31¾</div>
                <div>32¾</div>

                <div className="font-semibold">CHEST</div>
                <div>21</div>
                <div>22</div>
                <div>23</div>
                <div>24</div>
                <div>25¾</div>
                <div>27½</div>

                <div className="font-semibold">SLEEVE LENGTH</div>
                <div>32</div>
                <div>33</div>
                <div>34</div>
                <div>35</div>
                <div>36</div>
                <div>37</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
