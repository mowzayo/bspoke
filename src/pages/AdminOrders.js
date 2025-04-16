import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const ordersPerPage = 10;
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) throw new Error("Please log in");
        console.log("Fetching orders with token:", token);
        setLoading(true);
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `Failed to fetch orders: ${response.status} - ${text}`
          );
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [API_URL, token]);

  // Calculate the orders to display based on the current page
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (page - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Handle page navigation
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle image click to open modal
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="admin-orders">
      <h2>Admin - View Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}
      {orders.length === 0 && !loading && !error ? (
        <p>No orders found.</p>
      ) : (
        <>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderNumber}>
                  <td data-label="Order Number">{order.orderNumber}</td>
                  <td data-label="Customer">
                    {order.billingDetails?.firstName}{" "}
                    {order.billingDetails?.lastName}
                  </td>
                  <td data-label="Items">
                    <ul>
                      {order.cart.map((item, index) => (
                        <li key={index} className="cart-item">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                              onClick={() => handleImageClick(item.image)} // Open modal on click
                            />
                          )}
                          <span>
                            {item.name} - Size: {item.size || "N/A"}, Qty:{" "}
                            {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td data-label="Total">₦{order.total.toFixed(2)}</td>
                  <td data-label="Date & Time">
                    {new Date(order.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}{" "}
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for displaying larger image */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="image-modal-close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="image-modal-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
