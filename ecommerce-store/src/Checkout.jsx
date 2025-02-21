import React, { useState } from "react";
import "./Checkout.css";
import { useCart } from "./CartContext";

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before checkout.");
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {orderPlaced ? (
        <div className="order-success">
          <h3>Thank you, {formData.name}!</h3>
          <p>Your order has been placed successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <h3>Total: Rs. {getTotalPrice()}</h3>
          <button type="submit" className="checkout-btn">Place Order</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;