import React from "react";
import { Link, useLocation } from "react-router-dom";

function CartComplete() {
  const location = useLocation();
  const order = location.state?.order || {};

  return (
    <div>
      <section className="shop-checkout container">
        <h2 className="page-title">Order Received</h2>
        <div className="checkout-steps">{/* Unchanged */}</div>
        <div className="order-complete">
          <div className="order-complete__message">
            <svg>{/* Unchanged SVG */}</svg>
            <h3>Your order is completed!</h3>
            <p>Thank you. Your order has been received.</p>
          </div>
          <div className="order-info">
            <div className="order-info__item">
              <label>Order Number</label>
              <span>{order.orderNumber || "N/A"}</span>
            </div>
            <div className="order-info__item">
              <label>Date</label>
              <span>{new Date(order.date).toLocaleDateString() || "N/A"}</span>
            </div>
            <div className="order-info__item">
              <label>Total</label>
              <span>₦{order.total?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="order-info__item">
              <label>Payment Method</label>
              <span>{order.paymentMethod || "N/A"}</span>
            </div>
          </div>
          <div className="checkout__totals-wrapper">
            <div className="checkout__totals">
              <h3>Order Details</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cart?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.name} x {item.quantity}
                      </td>
                      <td>₦{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="2">No items</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>₦{order.subtotal?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr>
                    <th>SHIPPING</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>₦{order.vat?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>₦{order.total?.toFixed(2) || "0.00"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartComplete;
