import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import "./Profile.css";

function Profile() {
  const { user, cart, wishlist, logout } = useCart();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState({ street: "", city: "", zip: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProfileData();
    }
  }, [user, navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch profile data");
      const data = await response.json();
      setOrders(data.orders || []);
      setAddress(data.address || { street: "", city: "", zip: "" });
      setCard(data.card || { number: "", expiry: "", cvv: "" });
    } catch (err) {
      console.error("Fetch profile error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile/address",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(address),
        }
      );
      if (!response.ok) throw new Error("Failed to save address");
      alert("Address saved successfully!");
    } catch (err) {
      console.error("Save address error:", err);
      setError(err.message);
    }
  };

  const saveCard = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile/card",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(card),
        }
      );
      if (!response.ok) throw new Error("Failed to save card");
      alert("Card saved successfully!");
    } catch (err) {
      console.error("Save card error:", err);
      setError(err.message);
    }
  };

  if (!user) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="profilee-container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.email}</p>
      {error && <p className="text-red-500">{error}</p>}

      {/* Cart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex justify-between"
              >
                <span>
                  {item.name} (Size: {item.size})
                </span>
                <span>
                  Qty: {item.quantity} - ₦
                  {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Wishlist */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Wishlist</h2>
        {wishlist.items.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className="space-y-2">
            {wishlist.items.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>{item.productId.name || "Unnamed Product"}</span>
                <span>₦{item.productId.price || "N/A"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Shopping History */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Shopping History</h2>
        {orders.length === 0 ? (
          <p>No past orders.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li key={order._id} className="border p-2">
                <p>Order ID: {order._id}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ₦{order.total.toFixed(2)}</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.size}`}>
                      {item.name} (Size: {item.size}) - Qty: {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Address */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Address</h2>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          placeholder="Street"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          placeholder="City"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          placeholder="ZIP Code"
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={saveAddress}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Address
        </button>
      </div>

      {/* Card */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Payment Card</h2>
        <input
          type="text"
          value={card.number}
          onChange={(e) => setCard({ ...card, number: e.target.value })}
          placeholder="Card Number"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          value={card.expiry}
          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
          placeholder="Expiry (MM/YY)"
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          value={card.cvv}
          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          placeholder="CVV"
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={saveCard}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Card
        </button>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="bgg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
