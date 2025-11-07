import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, Menu, X, Home, Package, Palette, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import OrdersModal from './OrdersModal';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { currentTheme, themes, changeTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={28} />
            <span>VibeCart</span>
          </motion.div>
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/products" 
            className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link 
            to="/cart" 
            className={`navbar-link cart-link ${isActive('/cart') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span 
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>

        <div className="navbar-actions">
          <motion.button
            className="orders-button"
            onClick={() => setOrdersModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="My Orders"
          >
            <Truck size={20} />
          </motion.button>

          <div className="theme-selector">
            <motion.button
              className="theme-button"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette size={20} />
            </motion.button>
            
            {themeMenuOpen && (
              <motion.div 
                className="theme-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    className={`theme-option ${currentTheme === themeName ? 'active' : ''}`}
                    onClick={() => {
                      changeTheme(themeName);
                      setThemeMenuOpen(false);
                    }}
                  >
                    <div 
                      className="theme-preview" 
                      style={{ background: themes[themeName].gradient }}
                    />
                    <span>{themes[themeName].name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div 
            className="user-menu"
            onClick={() => navigate('/profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: 'pointer' }}
          >
            <User size={20} />
            <span>{user?.name}</span>
          </motion.div>

          <motion.button
            className="logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
          </motion.button>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <OrdersModal isOpen={ordersModalOpen} onClose={() => setOrdersModalOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
