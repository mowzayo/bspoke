// src/ProductContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        const productsWithDefaultCategory = response.data.map((product) => ({
          ...product,
          category: product.category || "uncategorized",
        }));
        console.log("Fetched products:", productsWithDefaultCategory); // Add this
        setProducts(productsWithDefaultCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [refresh, API_URL]);

  return (
    <ProductContext.Provider value={{ products, triggerRefresh }}>
      {children}
    </ProductContext.Provider>
  );
};
