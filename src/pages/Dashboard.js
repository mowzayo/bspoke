import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import "./Dashboard.css";

function Dashboard() {
  const { triggerRefresh } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    sizes: "",
    category: "",
    outOfStock: false,
  });
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Verification failed");
        }
        const { user } = await response.json();
        if (!user.isAdmin) {
          navigate("/");
          return;
        }

        const productResponse = await fetch(`${API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!productResponse.ok) throw new Error("Unauthorized");
        const data = await productResponse.json();
        setProducts(data);
      } catch (err) {
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate, API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("description", formData.description);
    formDataToSend.append("sizes", formData.sizes);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("outOfStock", formData.outOfStock);
    images.forEach((image, idx) => {
      formDataToSend.append("images", image);
    });

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/api/products/${editId}`
      : `${API_URL}/api/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error("Failed to save product");
      await fetchProducts();
      triggerRefresh(); // Trigger global product refresh
      setFormData({
        name: "",
        price: "",
        description: "",
        sizes: "",
        category: "",
        outOfStock: false,
      });
      setImages([]);
      setEditId(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      sizes: product.sizes ? product.sizes.join(", ") : "",
      category: product.category || "",
      outOfStock: product.outOfStock || false,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete product");
      await fetchProducts();
      triggerRefresh(); // Trigger global product refresh
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Pagination Logic
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="product-form"
        encType="multipart/form-data"
      >
        <button className="bu">
          <Link to="/AdminOrders" onClick={() => setMenuOpen(false)}>
            AdminOrders
          </Link>
        </button>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <div>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
          placeholder="Sizes (e.g., S, M, L)"
        />
        <select
          name="category"
          className="sel"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="shirt">Shirt</option>
          <option value="men">Men</option>
          <option value="pants">Pants</option>
          <option value="gift">Gift</option>
        </select>

        <div className="sel items-center gap-2 p-2 rounded w-[170px] mb-3">
          <label className="toggle-switch">
            <input
              type="checkbox"
              name="outOfStock"
              checked={formData.outOfStock}
              onChange={handleChange}
              className="toggle-input"
            />
            <span className="slider"></span>
          </label>
          <span> Out of Stock</span>
        </div>

        <button className="submit" type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>
      <h2>Products</h2>
      <table>
        <thead className="the">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₦{product.price}</td>
              <td>
                {Array.isArray(product.images) && product.images.length > 0 ? (
                  product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name}-${idx}`}
                      style={{ width: "50px", margin: "5px" }}
                    />
                  ))
                ) : (
                  <span>No images</span>
                )}
              </td>
              <td>{product.category || "N/A"}</td>
              <td>{product.outOfStock ? "Out of Stock" : "In Stock"}</td>
              <td>
                <button className="submi" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button
                  className="submi"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div
        className="pagination"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
