import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../CartContext";
import "./CartCheckout.css";

function CartCheckout() {
  const location = useLocation(); // Get current URL
  const { cart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => {
    const price = item.price
      ? parseFloat(item.price.toString().replace("₦", "").trim()) || 0
      : 0;
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  // Calculate 5% VAT
  const vat = subtotal * 0.05;

  // Calculate total (subtotal + VAT, assuming free shipping)
  const total = subtotal + vat;

  // State for country dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    "Australia",
    "Canada",
    "United Kingdom",
    "United States",
    "Turkey",
  ];

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle country selection
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setSearchTerm(""); // Clear search
    setIsOpen(false); // Close dropdown
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

        <form
          name="checkout-form"
          action="https://uomo-html.flexkitux.com/Demo2/shop_order_complete.html"
        >
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
                      placeholder="First Name"
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
                      placeholder="Last Name"
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
                      placeholder="Company Name (optional)"
                    />
                    <label htmlFor="checkout_company_name">
                      Company Name (optional)
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="search-field my-3">
                    <div className="form-label-fixed hover-container">
                      <label htmlFor="search-dropdown" className="form-label">
                        Country / Region*
                      </label>
                      <div className="js-hover__open">
                        <input
                          type="text"
                          className="form-control form-control-lg search-field__actor search-field__arrow-down"
                          id="search-dropdown"
                          value={selectedCountry}
                          onFocus={() => setIsOpen(true)}
                          onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                          }}
                          placeholder="Choose a location..."
                        />
                      </div>
                      {isOpen && (
                        <div className="filters-container js-hidden-content mt-2">
                          <div className="search-field__input-wrapper">
                            <input
                              type="text"
                              className="search-field__input form-control form-control-sm bg-lighter border-lighter"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <ul className="search-suggestion list-unstyled">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country, index) => (
                                <li
                                  key={index}
                                  className="search-suggestion__item js-search-select"
                                  onClick={() => handleSelect(country)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {country}
                                </li>
                              ))
                            ) : (
                              <li>No matches found</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating mt-3 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="checkout_street_address"
                      placeholder="Street Address *"
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
                      placeholder="Town / City *"
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
                      placeholder="Postcode / ZIP *"
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
                      placeholder="Phone *"
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
                      placeholder="Your Mail *"
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
                      Direct bank transfer
                      <span className="option-detail d-block">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference.Your order
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
                        vehicula elementum gravida nec dui. Aenean aliquam
                        varius ipsum, non ultricies tellus sodales eu. Donec
                        dignissim viverra nunc, ut aliquet magna posuere eget.
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
                        vehicula elementum gravida nec dui. Aenean aliquam
                        varius ipsum, non ultricies tellus sodales eu. Donec
                        dignissim viverra nunc, ut aliquet magna posuere eget.
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
                        vehicula elementum gravida nec dui. Aenean aliquam
                        varius ipsum, non ultricies tellus sodales eu. Donec
                        dignissim viverra nunc, ut aliquet magna posuere eget.
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
                <button className="btn btn-primary btn-checkout">
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

export default CartCheckout; // Export the component
