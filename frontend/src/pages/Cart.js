import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="cart-container">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>
            <ShoppingCart size={32} />
            Shopping Cart
          </h1>
          <p>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
        </motion.div>

        {cart.items.length === 0 ? (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <motion.button
              className="shop-now-btn"
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} />
              <span>Start Shopping</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <AnimatePresence>
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    className="cart-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <div className="cart-item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>

                    <div className="cart-item-details">
                      <h3>{item.product.name}</h3>
                      <p className="cart-item-category">{item.product.category}</p>
                      <p className="cart-item-price">${item.product.price}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <motion.button
                          onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="quantity">{item.quantity}</span>
                        <motion.button
                          onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      <div className="cart-item-total">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      <motion.button
                        className="remove-btn"
                        onClick={() => handleRemove(item._id)}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="cart-summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cart.total}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(parseFloat(cart.total) * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(parseFloat(cart.total) * 1.1).toFixed(2)}</span>
              </div>

              <motion.button
                className="checkout-btn"
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} />
              </motion.button>

              <button 
                className="continue-shopping"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </div>
      <ChatAssistant />
    </div>
  );
};

export default Cart;
