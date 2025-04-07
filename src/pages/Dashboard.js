import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    sizes: "",
  });
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use env variable

  // Check JWT token and load products
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      console.log("Dashboard - Token from localStorage:", token); // Debug token presence
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        console.log("Verifying token with /api/auth/verify..."); // Debug fetch start
        const response = await fetch(`${API_URL}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Verify response status:", response.status); // Debug response status
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Verification failed: ${response.status} - ${errorText}`
          );
        }
        const { user } = await response.json();
        console.log("Verified user:", user); // Debug user data
        if (!user.isAdmin) {
          console.log("User is not an admin, redirecting to home");
          navigate("/");
          return;
        }

        // Fetch products
        const productResponse = await fetch(`${API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!productResponse.ok) throw new Error("Unauthorized");
        const data = await productResponse.json();
        console.log("Initial products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("Session check error:", err.message); // Debug error details
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate, API_URL]); // Add API_URL to dependencies

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
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Add Product button clicked");
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("description", formData.description);
    formDataToSend.append("sizes", formData.sizes);
    images.forEach((image, idx) => {
      formDataToSend.append("images", image);
      console.log(`Appending image ${idx}:`, image.name);
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
      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);
      if (!response.ok) throw new Error("Failed to save product");
      await fetchProducts();
      setFormData({ name: "", price: "", description: "", sizes: "" });
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
      image: product.image,
      description: product.description,
      sizes: product.sizes.join(", "),
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    console.log("Delete button clicked for ID:", id);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response status:", response.status);
      const responseText = await response.text();
      console.log("Delete response text:", responseText);
      if (!response.ok)
        throw new Error(`Failed to delete product: ${response.status}`);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      {/* Added to use handleLogout */}
      <form
        onSubmit={handleSubmit}
        className="product-form"
        encType="multipart/form-data"
      >
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>{" "}
    </div>
  );
}

export default Dashboard;
