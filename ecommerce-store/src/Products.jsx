import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import Sidebar from "./Sidebar";
import "./Products.css";

const API_URL = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ color: [], gender: [], price: [], type: [] });
  const [notification, setNotification] = useState(""); // State for notification

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const matchesFilters = (product) => {
    return Object.keys(filters).every((key) => {
      return filters[key].length === 0 || filters[key].some((selectedValue) => product[key] === selectedValue);
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);

    // Hide the notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    .filter(matchesFilters);

  return (
    <div className="products-container">
      <Sidebar onFilterChange={handleFilterChange} products={products} />
      <div className="products-content">
        <div className="search-container">
          <input type="text" placeholder="Search for products..." onChange={(e) => setSearch(e.target.value)} className="search-box" />
        </div>

        {/* Notification Message */}
        {notification && <div className="notification">{notification}</div>}

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.imageURL} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Rs {product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
