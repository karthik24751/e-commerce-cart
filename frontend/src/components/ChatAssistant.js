import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import '../styles/ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your VibeCart assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const responses = {
    'how to order': 'To place an order: 1) Browse products 2) Add items to cart 3) Go to cart 4) Click checkout. It\'s that simple!',
    'where is my cart': 'Click on the cart icon in the navigation bar or visit /cart to see your shopping cart.',
    'payment methods': 'Currently, we support all major credit cards, debit cards, and PayPal. More payment options coming soon!',
    'shipping': 'We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.',
    'return policy': 'You can return any item within 30 days of purchase for a full refund. Items must be in original condition.',
    'track order': 'You can track your order from the Dashboard under "Recent Orders" section.',
    'help': 'I can help you with: ordering, cart, payments, shipping, returns, and tracking orders. Just ask!',
    'theme': 'You can change themes by clicking the palette icon in the navigation bar. We have 5 beautiful themes!',
    'account': 'Manage your account from the Dashboard. You can view orders, update profile, and more.',
    'products': 'Browse our products page to see all available items. Use filters to find exactly what you need!'
  };

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I\'m not sure about that. Try asking about: orders, cart, payments, shipping, returns, themes, or products!';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = { type: 'bot', text: getResponse(input) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen 
            ? '0 0 0 0 rgba(99, 102, 241, 0)' 
            : ['0 0 0 0 rgba(99, 102, 241, 0.7)', '0 0 0 20px rgba(99, 102, 241, 0)']
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity }
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3>VibeCart Assistant</h3>
                  <span className="chat-status">Online</span>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`chat-message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.text}
                </motion.div>
              ))}
            </div>

            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <motion.button
                className="chat-send"
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
