import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Package, MapPin, ChevronLeft, ChevronRight, Tag, Zap, Gift, Percent, Truck, Shield, Clock, Award } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ChatAssistant from '../components/ChatAssistant';
import OrdersModal from '../components/OrdersModal';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { cart, cartCount } = useCart();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);

  const banners = [
    {
      id: 1,
      title: "🎉 MEGA SALE LIVE!",
      subtitle: "Up to 70% OFF on Electronics",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: Tag
    },
    {
      id: 2,
      title: "⚡ FLASH DEALS",
      subtitle: "Limited Time Offers - Hurry Up!",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: Zap
    },
    {
      id: 3,
      title: "🎁 FREE SHIPPING",
      subtitle: "On Orders Above $50",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: Gift
    },
    {
      id: 4,
      title: "💄 BEAUTY BONANZA",
      subtitle: "Flat 50% OFF on All Makeup",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: Percent
    }
  ];

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-rotate banners
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // Fetch default address
      const addressRes = await axios.get(`${process.env.REACT_APP_API_URL}/address/default`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDefaultAddress(addressRes.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  };

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const stats = [
    {
      icon: ShoppingBag,
      label: 'Cart Items',
      value: cartCount,
      color: '#4f46e5',
      bgColor: '#eef2ff',
      onClick: () => navigate('/cart')
    },
    {
      icon: TrendingUp,
      label: 'Total Orders',
      value: recentOrders.length,
      color: '#10b981',
      bgColor: '#ecfdf5',
      onClick: () => setOrdersModalOpen(true)
    },
    {
      icon: Package,
      label: 'Cart Total',
      value: `$${typeof cart.total === 'number' ? cart.total.toFixed(2) : '0.00'}`,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      onClick: () => navigate('/cart')
    },
    {
      icon: MapPin,
      label: 'Default Address',
      value: defaultAddress ? 'Saved' : 'Not Set',
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      onClick: () => navigate('/profile/addresses')
    }
  ];

  return (
    <div className="page-container">
      <Navbar />
      <div className="dashboard-container">
        {/* Header */}
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="dashboard-header-content">
            <div className="dashboard-profile">
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="dashboard-profile-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100';
                  }}
                />
              ) : (
                <div className="dashboard-profile-initials">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
                <p>Here's what's happening with your shopping today</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Saved Address Display */}
        {defaultAddress ? (
          <motion.div
            className="saved-address-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="address-header">
              <MapPin size={24} />
              <h3>Delivery Address</h3>
            </div>
            <div className="address-content">
              <p className="address-name">{defaultAddress.fullName}</p>
              <p className="address-details">
                {defaultAddress.addressLine1}, {defaultAddress.addressLine2 && `${defaultAddress.addressLine2}, `}
                {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
              </p>
              <p className="address-contact">📞 {defaultAddress.phone} | ✉️ {defaultAddress.email}</p>
            </div>
            <motion.button
              className="change-address-btn"
              onClick={() => navigate('/profile/addresses')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Change Delivery Address
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="saved-address-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="address-header">
              <MapPin size={24} />
              <h3>Delivery Address</h3>
            </div>
            <div className="address-content">
              <p className="address-name">No Address Set</p>
              <p className="address-details">Please add a delivery address to continue shopping</p>
            </div>
            <motion.button
              className="change-address-btn"
              onClick={() => navigate('/profile/addresses')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add New Delivery Address
            </motion.button>
          </motion.div>
        )}

        {/* Promotional Banner Carousel */}
        <motion.div
          className="banner-carousel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button className="banner-nav prev" onClick={prevBanner}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="banner-wrapper">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
                style={{ background: banner.color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentBanner ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="banner-content">
                  <banner.icon size={48} className="banner-icon" />
                  <div>
                    <h2>{banner.title}</h2>
                    <p>{banner.subtitle}</p>
                  </div>
                </div>
                <button className="banner-cta" onClick={() => navigate('/products')}>
                  Shop Now →
                </button>
              </motion.div>
            ))}
          </div>

          <button className="banner-nav next" onClick={nextBanner}>
            <ChevronRight size={24} />
          </button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Recommended Products - Full Width First */}
        <motion.div
          className="recommended-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <h2>Recommended for You</h2>
          </div>
          
          <div className="recommended-grid">
            {recommendedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="recommended-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="recommended-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="recommended-info">
                  <h4>{product.name}</h4>
                  <p className="recommended-price">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="explore-btn"
            onClick={() => navigate('/products')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Products →
          </motion.button>
        </motion.div>

        {/* Stats Section - Full Width */}
        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                style={{ backgroundColor: stat.bgColor, cursor: 'pointer' }}
                onClick={stat.onClick}
              >
                <div className="stat-icon" style={{ color: stat.color }}>
                  <stat.icon size={32} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
      <ChatAssistant />
      <OrdersModal isOpen={ordersModalOpen} onClose={() => setOrdersModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
