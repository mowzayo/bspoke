import { useCart } from "../CartContext";
import { Link, useLocation } from "react-router-dom";
import "./Cart.css";
import { useCallback, useState, useEffect, useMemo } from "react";

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const location = useLocation();
  const [renderKey, setRenderKey] = useState(Date.now());

  const handleRemoveFromCart = useCallback(
    async (productId, size) => {
      await removeFromCart(productId, size);
      setRenderKey(Date.now()); // Only update renderKey after cart change
    },
    [removeFromCart]
  );

  // Only depend on renderKey to avoid cart-related loops
  useEffect(() => {
    console.log("Cart updated, new renderKey:", renderKey);
  }, [renderKey]);

  const { subtotal, vat, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("₦", "").trim()) || 0
          : Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return acc + price * quantity;
    }, 0);
    const vat = subtotal * 0.05;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [cart]);

  return (
    <main>
      <div className="mb-5 pb-xl-5"></div>
      <section className="shop-checkout container">
        <h2 className="page-title">Cart</h2>
        <div className="checkout-steps">
          <Link
            to="/Cart"
            className={`checkout-steps__item ${location.pathname === "/Cart" ? "active" : ""}`}
          >
            <span className="checkout-steps__item-number">01</span>
            <span className="checkout-steps__item-title">
              <span>Shopping Bag</span>
              <em>Manage Your Items List</em>
            </span>
          </Link>
          <Link
            to="/CartCheckout"
            className={`checkout-steps__item ${location.pathname === "/CartCheckout" ? "active" : ""}`}
          >
            <span className="checkout-steps__item-number">02</span>
            <span className="checkout-steps__item-title">
              <span>Shipping and Checkout</span>
              <em>Checkout Your Items List</em>
            </span>
          </Link>
          <Link
            to="/CartComplete"
            className={`checkout-steps__item ${location.pathname === "/CartComplete" ? "active" : ""}`}
          >
            <span className="checkout-steps__item-number">03</span>
            <span className="checkout-steps__item-title">
              <span>Confirmation</span>
              <em>Review And Submit Your Order</em>
            </span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="shopping-cart">
            <div className="cart-table__wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Delete</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody key={renderKey}>
                  {cart.map((item) => {
                    const price =
                      typeof item.price === "string"
                        ? parseFloat(item.price.replace("₦", "").trim()) || 0
                        : Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 1;
                    const itemSubtotal = price * quantity;
                    const productId =
                      typeof item.productId === "object"
                        ? item.productId._id
                        : item.productId;

                    return (
                      <tr key={item._id || `${productId}-${item.size}`}>
                        <td data-label="Action">
                          <button
                            onClick={() =>
                              handleRemoveFromCart(productId, item.size)
                            }
                            className="remove-cart-btn"
                          >
                            ×
                          </button>
                        </td>
                        <td data-label="Product">
                          <img
                            src={item.image}
                            alt={item.name}
                            width="120"
                            height="100"
                          />
                        </td>
                        <td data-label="Name">
                          <span>{item.name}</span>
                          <p>Size: {item.size}</p>
                        </td>
                        <td data-label="Price">₦{price.toFixed(2)}</td>
                        <td data-label="Quantity">
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) =>
                              updateQuantity(
                                productId,
                                item.size,
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td data-label="Subtotal">
                          ₦{itemSubtotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="cart-table-footer">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Coupon Code"
                />
                <button className="btn btn-light">Apply Coupon</button>
                <button className="btn btn-light">Update Cart</button>
              </div>
            </div>
            <div className="shopping-cart__totals-wrapper">
              <h3>Cart Totals</h3>
              <table className="cart-totals">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>₦{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>VAT (5%)</th>
                    <td>₦{vat.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>₦{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-primary btn-checkout"
                disabled={cart.length === 0}
              >
                <Link
                  to={cart.length > 0 ? "/CartCheckout" : "#"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Proceed to Checkout
                </Link>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
