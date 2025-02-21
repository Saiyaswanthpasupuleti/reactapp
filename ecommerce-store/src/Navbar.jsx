import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "./CartContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">TeeRex Store</Link>

      

        <div className={`nav-links ${isMobileOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setIsMobileOpen(false)}>
            Products
          </Link>
        </div>

        <div className="mobile-icons">
          <Link to="/cart" className="cart-icon">
            <FiShoppingCart />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
          <button className="menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
