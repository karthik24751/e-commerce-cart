import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const { user, token, isAuthenticated } = useAuth();

  // Initialize socket connection
  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io(process.env.REACT_APP_SOCKET_URL);
      
      newSocket.on('connect', () => {
        console.log('Socket connected');
        newSocket.emit('join', user._id);
      });

      newSocket.on('cart_updated', (data) => {
        console.log('Cart updated via socket:', data);
        setCart({ items: data.items, total: data.total });
        toast.success('Cart updated!', { duration: 2000 });
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user]);

  // Fetch cart on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart({ items: [], total: '0.00' });
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast.error('Please login to add items to cart');
      return { success: false };
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(response.data);
      
      // Emit socket event for real-time update
      if (socket && user) {
        socket.emit('cart_update', {
          userId: user._id,
          items: response.data.items,
          total: response.data.total
        });
      }
      
      toast.success('Added to cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    if (!token) return { success: false };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/cart/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(response.data);
      
      if (socket && user) {
        socket.emit('cart_update', {
          userId: user._id,
          items: response.data.items,
          total: response.data.total
        });
      }
      
      return { success: true };
    } catch (error) {
      toast.error('Failed to update cart');
      return { success: false };
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return { success: false };

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cart/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(response.data);
      
      if (socket && user) {
        socket.emit('cart_update', {
          userId: user._id,
          items: response.data.items,
          total: response.data.total
        });
      }
      
      toast.success('Removed from cart');
      return { success: true };
    } catch (error) {
      toast.error('Failed to remove item');
      return { success: false };
    }
  };

  const clearCart = async () => {
    if (!token) return { success: false };

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCart(response.data);
      
      if (socket && user) {
        socket.emit('cart_update', {
          userId: user._id,
          items: [],
          total: '0.00'
        });
      }
      
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    cartCount: cart.items.length
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
