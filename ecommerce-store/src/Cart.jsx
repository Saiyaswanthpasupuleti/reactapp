import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageURL} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Rs {item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>Qty: {item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="delete-btn" onClick={() => removeFromCart(item.id)}>
                Delete
              </button>
            </div>
          ))}
          <hr />
          <h3>Total amount: Rs. {getTotalPrice()}</h3>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
