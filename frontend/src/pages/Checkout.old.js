import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, Package, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ChatAssistant from '../components/ChatAssistant';
import toast from 'react-hot-toast';
import '../styles/Checkout.css';

const Checkout = () => {
  const { token } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setProcessing(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        { cartItems: cart.items },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderDetails(response.data);
      setOrderComplete(true);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="checkout-container">
          <motion.div
            className="empty-checkout"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Package size={80} />
            <h2>No items to checkout</h2>
            <p>Add some products to your cart first</p>
            <button 
              className="back-to-shop"
              onClick={() => navigate('/products')}
            >
              Go to Products
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="checkout-container">
        <AnimatePresence mode="wait">
          {!orderComplete ? (
            <motion.div
              key="checkout-form"
              className="checkout-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="checkout-main">
                <motion.div
                  className="checkout-header"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button 
                    className="back-button"
                    onClick={() => navigate('/cart')}
                  >
                    <ArrowLeft size={20} />
                    Back to Cart
                  </button>
                  <h1>Checkout</h1>
                </motion.div>

                <motion.div
                  className="checkout-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2>Order Summary</h2>
                  <div className="order-items">
                    {cart.items.map((item) => (
                      <div key={item._id} className="checkout-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div className="checkout-item-info">
                          <h4>{item.product.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="checkout-item-price">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="checkout-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2>Payment Method</h2>
                  <div className="payment-method">
                    <CreditCard size={24} />
                    <span>Mock Payment (Demo)</span>
                  </div>
                  <p className="payment-note">
                    This is a demo checkout. No actual payment will be processed.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="checkout-sidebar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2>Payment Details</h2>
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>${cart.total}</span>
                  </div>
                  <div className="price-row">
                    <span>Shipping</span>
                    <span className="free">Free</span>
                  </div>
                  <div className="price-row">
                    <span>Tax (10%)</span>
                    <span>${(parseFloat(cart.total) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>${(parseFloat(cart.total) * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  className="place-order-btn"
                  onClick={handleCheckout}
                  disabled={processing}
                  whileHover={{ scale: processing ? 1 : 1.02 }}
                  whileTap={{ scale: processing ? 1 : 0.98 }}
                >
                  {processing ? (
                    <>
                      <div className="spinner-small"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Place Order</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="order-success"
              className="order-success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Check size={64} />
              </motion.div>

              <h1>Order Placed Successfully!</h1>
              <p>Thank you for your purchase</p>

              <div className="order-receipt">
                <h3>Order Receipt</h3>
                <div className="receipt-row">
                  <span>Order ID:</span>
                  <span className="receipt-value">{orderDetails?.orderId}</span>
                </div>
                <div className="receipt-row">
                  <span>Total Amount:</span>
                  <span className="receipt-value">${orderDetails?.total}</span>
                </div>
                <div className="receipt-row">
                  <span>Date:</span>
                  <span className="receipt-value">
                    {new Date(orderDetails?.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="receipt-row">
                  <span>Status:</span>
                  <span className="receipt-status">{orderDetails?.status}</span>
                </div>
              </div>

              <div className="success-actions">
                <motion.button
                  className="continue-shopping-btn"
                  onClick={() => navigate('/products')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
                <motion.button
                  className="view-orders-btn"
                  onClick={() => navigate('/dashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Orders
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default Checkout;
