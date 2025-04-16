import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import "./CartCheckout.css";

function CartCheckout() {
  const location = useLocation();
  const { cart, clearCart } = useCart(); // Ensure clearCart is in CartContext
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const price = item.price
      ? parseFloat(item.price.toString().replace("₦", "").trim()) || 0
      : 0;
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat;

  // Generate a unique order number
  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const billingDetails = {
      firstName: formData.get("checkout_first_name"),
      lastName: formData.get("checkout_last_name"),
      companyName: formData.get("checkout_company_name"),
      country: formData.get("checkout_country"),
      streetAddress: formData.get("checkout_street_address"),
      city: formData.get("checkout_city"),
      zipcode: formData.get("checkout_zipcode"),
      phone: formData.get("checkout_phone"),
      email: formData.get("checkout_email"),
      orderNotes: formData.get("order_notes"),
    };

    // Get the selected payment method label and extract only the title
    const paymentLabel = document.querySelector(
      'input[name="checkout_payment_method"]:checked'
    )?.nextElementSibling;
    const paymentMethod = paymentLabel
      ? paymentLabel.childNodes[0].textContent.trim()
      : "N/A";

    const orderData = {
      orderNumber: generateOrderNumber(),
      billingDetails,
      cart: cart.map((item) => ({
        name: item.name,
        price: parseFloat(item.price.toString().replace("₦", "").trim()) || 0,
        quantity: Number(item.quantity) || 1,
        size: item.size,
        image: item.image,
      })),
      subtotal,
      vat,
      total,
      date: new Date().toISOString(),
      paymentMethod, // Use the cleaned-up payment method
    };

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to place order: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Order placed successfully:", result);

      clearCart();
      navigate("/CartComplete", {
        state: { order: result.order || orderData },
      });
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert(
        `Failed to place order: ${error.message}. Please check the console for details.`
      );
    }
  };

  return (
    <div>
      <div className="mb-4 pb-4" />
      <section className="shop-checkout container">
        <div className="mb-4 pb-4" />
        <h2 className="page-title">Shipping and Checkout</h2>
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

        <form name="checkout-form" onSubmit={handlePlaceOrder}>
          <div className="checkout-form">
            <div className="billing-info__wrapper">
              <h4>BILLING DETAILS</h4>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_first_name"
                      name="checkout_first_name"
                      placeholder="First Name"
                      required
                    />
                    <label htmlFor="checkout_first_name">First Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_last_name"
                      name="checkout_last_name"
                      placeholder="Last Name"
                      required
                    />
                    <label htmlFor="checkout_last_name">Last Name</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_company_name"
                      name="checkout_company_name"
                      placeholder="Company Name (optional)"
                    />
                    <label htmlFor="checkout_company_name">
                      Company Name (optional)
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_country"
                      name="checkout_country"
                      placeholder="Country / Region *"
                      required
                    />
                    <label htmlFor="checkout_country">Country / Region *</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating mt-3 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_street_address"
                      name="checkout_street_address"
                      placeholder="Street Address *"
                      required
                    />
                    <label htmlFor="checkout_street_address">
                      Street Address *
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_city"
                      name="checkout_city"
                      placeholder="Town / City *"
                      required
                    />
                    <label htmlFor="checkout_city">Town / City *</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_zipcode"
                      name="checkout_zipcode"
                      placeholder="Postcode / ZIP *"
                      required
                    />
                    <label htmlFor="checkout_zipcode">Postcode / ZIP *</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_phone"
                      name="checkout_phone"
                      placeholder="Phone *"
                      required
                    />
                    <label htmlFor="checkout_phone">Phone *</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating my-3">
                    <input
                      type="email"
                      className="form-control"
                      id="checkout_email"
                      name="checkout_email"
                      placeholder="Your Mail *"
                      required
                    />
                    <label htmlFor="checkout_email">Your Mail *</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                      id="create_account"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="create_account"
                    >
                      CREATE AN ACCOUNT?
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                      id="ship_different_address"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="ship_different_address"
                    >
                      SHIP TO A DIFFERENT ADDRESS?
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="mt-3">
                  <textarea
                    className="form-control form-control_gray"
                    name="order_notes"
                    placeholder="Order Notes (optional)"
                    cols={30}
                    rows={8}
                  />
                </div>
              </div>
            </div>
            <div className="checkout__totals-wrapper">
              <div className="sticky-content">
                <div className="checkout__totals">
                  <h3>Your Order</h3>
                  <table className="checkout-cart-items">
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length === 0 ? (
                        <tr>
                          <td colSpan="2">Your cart is empty</td>
                        </tr>
                      ) : (
                        cart.map((item, index) => {
                          const price = item.price
                            ? parseFloat(
                                item.price.toString().replace("₦", "").trim()
                              ) || 0
                            : 0;
                          const quantity = Number(item.quantity) || 1;
                          const itemSubtotal = price * quantity;

                          return (
                            <tr key={index}>
                              <td>
                                {item.name} x {quantity}
                              </td>
                              <td>₦{itemSubtotal.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  <table className="checkout-totals">
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td>₦{subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>SHIPPING</th>
                        <td>Free shipping</td>
                      </tr>
                      <tr>
                        <th>VAT (5%)</th>
                        <td>₦{vat.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>TOTAL</th>
                        <td>₦{total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="checkout__payment-methods">
                  <div className="form-check">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="radio"
                      name="checkout_payment_method"
                      id="checkout_payment_method_1"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkout_payment_method_1"
                    >
                      <h4>Direct bank transfer </h4>
                      <span className="option-detail d-block">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="radio"
                      name="checkout_payment_method"
                      id="checkout_payment_method_2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkout_payment_method_2"
                    >
                      Check payments
                      <span className="option-detail d-block">
                        Phasellus sed volutpat orci. Fusce eget lore mauris
                        vehicula elementum gravida nec dui.
                      </span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="radio"
                      name="checkout_payment_method"
                      id="checkout_payment_method_3"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkout_payment_method_3"
                    >
                      Cash on delivery
                      <span className="option-detail d-block">
                        Phasellus sed volutpat orci. Fusce eget lore mauris
                        vehicula elementum gravida nec dui.
                      </span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="radio"
                      name="checkout_payment_method"
                      id="checkout_payment_method_4"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkout_payment_method_4"
                    >
                      Paypal
                      <span className="option-detail d-block">
                        Phasellus sed volutpat orci. Fusce eget lore mauris
                        vehicula elementum gravida nec dui.
                      </span>
                    </label>
                  </div>
                  <div className="policy-text">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <a href="terms.html" target="_blank">
                      privacy policy
                    </a>
                    .
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-checkout">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <div className="mb-4 pb-4" />
    </div>
  );
}

export default CartCheckout;
