// src/pages/Dashboard.js
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

  // Check session and load products
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/check-session",
          {
            credentials: "include", // Send session cookie
          }
        );
        if (!response.ok) throw new Error("Not logged in");
        const { user } = await response.json();
        if (!user.isAdmin) {
          console.log("User is not an admin:", user);
          navigate("/");
          return;
        }

        // Fetch products
        const productResponse = await fetch(
          "http://localhost:5000/api/products",
          {
            credentials: "include",
          }
        );
        if (!productResponse.ok) throw new Error("Unauthorized");
        const data = await productResponse.json();
        console.log("Initial products fetched:", data);
        setProducts(data);
      } catch (err) {
        console.error("Session check error:", err);
        navigate("/login");
      }
    };
    checkSession();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        credentials: "include",
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
      ? `http://localhost:5000/api/products/${editId}`
      : "http://localhost:5000/api/products";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include", // Send session cookie
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
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
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
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
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
        <button type="submit">
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
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
