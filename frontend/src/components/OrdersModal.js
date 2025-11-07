import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CheckCircle, MapPin, Calendar, DollarSign, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import '../styles/OrdersModal.css';

const OrdersModal = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/checkout/orders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/checkout/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Order cancelled successfully');
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'ordered':
        return <Package size={20} />;
      case 'shipped':
        return <Truck size={20} />;
      case 'delivered':
        return <CheckCircle size={20} />;
      case 'cancelled':
        return <X size={20} />;
      default:
        return <Package size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ordered':
        return '#3b82f6';
      case 'shipped':
        return '#f59e0b';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="orders-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="orders-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="modal-header">
              <h2>My Orders</h2>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading your orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <Package size={48} />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <motion.div
                      key={order._id}
                      className="order-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* Order Header */}
                      <div
                        className="order-header"
                        onClick={() =>
                          setExpandedOrder(expandedOrder === order._id ? null : order._id)
                        }
                      >
                        <div className="order-info">
                          <h3>Order #{order.orderId}</h3>
                          <p className="order-date">
                            <Calendar size={14} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="order-status" style={{ borderColor: getStatusColor(order.status) }}>
                          <span style={{ color: getStatusColor(order.status) }}>
                            {getStatusIcon(order.status)}
                          </span>
                          <span className="status-text" style={{ color: getStatusColor(order.status) }}>
                            {order.status}
                          </span>
                        </div>

                        <div className="order-total">
                          <DollarSign size={16} />
                          <span>${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}</span>
                        </div>
                      </div>

                      {/* Expanded Order Details */}
                      <AnimatePresence>
                        {expandedOrder === order._id && (
                          <motion.div
                            className="order-details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            {/* Order Items */}
                            <div className="order-items">
                              <h4>Items</h4>
                              {order.items && order.items.length > 0 ? (
                                <div className="items-list">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="item-row">
                                      {item.product?.image && (
                                        <img src={item.product.image} alt={item.product?.name} />
                                      )}
                                      <div className="item-info">
                                        <p className="item-name">{item.product?.name}</p>
                                        <p className="item-qty">Qty: {item.quantity}</p>
                                      </div>
                                      <p className="item-price">
                                        ${typeof item.product?.price === 'number' 
                                          ? (item.product.price * item.quantity).toFixed(2) 
                                          : item.product?.price}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="no-items">No items in this order</p>
                              )}
                            </div>

                            {/* Delivery Address */}
                            {order.address && (
                              <div className="delivery-address">
                                <h4>
                                  <MapPin size={16} /> Delivery Address
                                </h4>
                                <div className="address-box">
                                  <p className="address-name">{order.address.fullName}</p>
                                  <p className="address-text">
                                    {order.address.addressLine1}
                                    {order.address.addressLine2 && `, ${order.address.addressLine2}`}
                                  </p>
                                  <p className="address-text">
                                    {order.address.city}, {order.address.state} - {order.address.pincode}
                                  </p>
                                  <p className="address-contact">
                                    📞 {order.address.phone} | ✉️ {order.address.email}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Order Timeline */}
                            <div className="order-timeline">
                              <h4>Order Status</h4>
                              <div className="timeline">
                                <div className={`timeline-item ${['ordered', 'shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'completed' : ''}`}>
                                  <div className="timeline-dot">
                                    <Package size={16} />
                                  </div>
                                  <div className="timeline-content">
                                    <p className="timeline-title">Order Placed</p>
                                    <p className="timeline-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>

                                <div className={`timeline-item ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? 'completed' : ''}`}>
                                  <div className="timeline-dot">
                                    <Truck size={16} />
                                  </div>
                                  <div className="timeline-content">
                                    <p className="timeline-title">Shipped</p>
                                    <p className="timeline-date">In Transit</p>
                                  </div>
                                </div>

                                <div className={`timeline-item ${order.status.toLowerCase() === 'delivered' ? 'completed' : ''}`}>
                                  <div className="timeline-dot">
                                    <CheckCircle size={16} />
                                  </div>
                                  <div className="timeline-content">
                                    <p className="timeline-title">Delivered</p>
                                    <p className="timeline-date">Expected soon</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Cancel Order Button */}
                            {order.status.toLowerCase() !== 'delivered' && order.status.toLowerCase() !== 'cancelled' && (
                              <motion.button
                                className="cancel-order-btn"
                                onClick={() => handleCancelOrder(order._id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Trash2 size={16} />
                                Cancel Order
                              </motion.button>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrdersModal;
