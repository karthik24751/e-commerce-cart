import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Palette, MessageCircle, TrendingUp } from 'lucide-react';
import '../styles/Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: 'Smart Shopping',
      description: 'Browse curated products with intelligent search and filters'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Instant cart synchronization across all your devices'
    },
    {
      icon: Palette,
      title: '5 Beautiful Themes',
      description: 'Personalize your experience with stunning color themes'
    },
    {
      icon: Shield,
      title: 'Secure Checkout',
      description: 'Safe and encrypted payment processing'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Get instant help with our smart chat assistant'
    },
    {
      icon: TrendingUp,
      title: 'Best Deals',
      description: 'Discover amazing products at great prices'
    }
  ];

  return (
    <div className="welcome-container">
      <div className="welcome-background">
        <div className="welcome-blob blob-1"></div>
        <div className="welcome-blob blob-2"></div>
        <div className="welcome-blob blob-3"></div>
      </div>

      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="welcome-hero"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div 
            className="welcome-logo"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingCart size={64} />
          </motion.div>
          
          <h1 className="welcome-title">
            Welcome to <span className="gradient-text">VibeCart</span>
          </h1>
          
          <p className="welcome-subtitle">
            Your Modern Shopping Experience Awaits
          </p>
          
          <p className="welcome-description">
            Discover a seamless shopping journey with real-time updates, 
            beautiful themes, and an AI-powered assistant to help you every step of the way.
          </p>

          <motion.div 
            className="welcome-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="welcome-btn primary"
              onClick={() => navigate('/signup')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            
            <motion.button
              className="welcome-btn secondary"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="welcome-features"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="features-title">Why Choose VibeCart?</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="welcome-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p>Join thousands of happy shoppers today! 🎉</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
