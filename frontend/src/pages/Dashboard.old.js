import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Package, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ChatAssistant from '../components/ChatAssistant';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { cart, cartCount } = useCart();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent orders
      const ordersRes = await axios.get(`${process.env.REACT_APP_API_URL}/checkout/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentOrders(ordersRes.data.slice(0, 3));

      // Fetch recommended products
      const productsRes = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setRecommendedProducts(productsRes.data.slice(0, 4));
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Cart Items',
      value: cartCount,
      color: '#6366f1',
      bgColor: '#6366f120'
    },
    {
      icon: Package,
      label: 'Total Orders',
      value: recentOrders.length,
      color: '#10b981',
      bgColor: '#10b98120'
    },
    {
      icon: TrendingUp,
      label: 'Cart Total',
      value: `$${cart.total}`,
      color: '#f59e0b',
      bgColor: '#f59e0b20'
    }
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Here's what's happening with your shopping today</p>
          </div>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="stat-icon"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                <stat.icon size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-grid">
          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="section-header">
              <h2>
                <Package size={24} />
                Recent Orders
              </h2>
              {recentOrders.length > 0 && (
                <button className="view-all-btn">View All</button>
              )}
            </div>

            {loading ? (
              <div className="loading-state">Loading orders...</div>
            ) : recentOrders.length > 0 ? (
              <div className="orders-list">
                {recentOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    className="order-item"
                    whileHover={{ x: 5 }}
                  >
                    <div className="order-info">
                      <div className="order-id">#{order.orderId}</div>
                      <div className="order-date">
                        <Clock size={14} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="order-details">
                      <span className={`order-status ${order.status}`}>
                        {order.status}
                      </span>
                      <span className="order-total">${order.total.toFixed(2)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Package size={48} />
                <p>No orders yet</p>
                <button 
                  className="cta-button"
                  onClick={() => navigate('/products')}
                >
                  Start Shopping
                </button>
              </div>
            )}
          </motion.div>

          <motion.div
            className="dashboard-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="section-header">
              <h2>
                <TrendingUp size={24} />
                Recommended for You
              </h2>
            </div>

            {loading ? (
              <div className="loading-state">Loading products...</div>
            ) : (
              <div className="recommended-grid">
                {recommendedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    className="recommended-item"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/products')}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="recommended-info">
                      <h4>{product.name}</h4>
                      <p>${product.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              className="explore-button"
              onClick={() => navigate('/products')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore All Products</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default Dashboard;
