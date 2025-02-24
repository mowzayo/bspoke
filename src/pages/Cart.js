import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => {
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.replace('₦', '').trim()) || 0
      : Number(item.price) || 0; // Handle number directly
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  // Calculate 5% VAT
  const vat = subtotal * 0.05;

  // Calculate total
  const total = subtotal + vat;

  return (
    <main>
      <div className="mb-5 pb-xl-5"></div>
      <section className="shop-checkout container">
        <h2 className="page-title">Cart</h2>

        <div className="checkout-steps">
          <Link to="/Cart" className="checkout-steps__item active">
            <span className="checkout-steps__item-number">01</span>
            <span className="checkout-steps__item-title">
              <span>Shopping Bag</span>
              <em>Manage Your Items List</em>
            </span>
          </Link>
          <Link to="/CartCheckout" className="checkout-steps__item">
            <span className="checkout-steps__item-number">02</span>
            <span className="checkout-steps__item-title">
              <span>Shipping and Checkout</span>
              <em>Checkout Your Items List</em>
            </span>
          </Link>
          <Link to="/CartComplete" className="checkout-steps__item">
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
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const price = typeof item.price === 'string'
                      ? parseFloat(item.price.replace('₦', '').trim()) || 0
                      : Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 1;
                    const itemSubtotal = price * quantity;

                    return (
                      <tr key={item.id}>
                        <td>
                          <img src={item.image} alt={item.name} width="120" height="100" />
                        </td>
                        <td>
                          <span>{item.name}</span>
                          <p>Size: {item.size}</p>
                        </td>
                        <td>₦{price.toFixed(2)}</td>
                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                          />
                        </td>
                        <td>₦{itemSubtotal.toFixed(2)}</td>
                        <td>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-cart"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="cart-table-footer">
                <input className="form-control" type="text" placeholder="Coupon Code" />
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
  disabled={cart.length === 0} // Disable if cart is empty
>
  <Link to={cart.length > 0 ? "/CartCheckout" : "#"} style={{ color: 'white', textDecoration: 'none' }}>
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