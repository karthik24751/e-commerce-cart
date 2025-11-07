const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// @route   POST /api/checkout
// @desc    Process checkout and create order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!address) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderId,
      items: orderItems,
      total,
      address,
      paymentMethod: paymentMethod || 'cod',
      status: 'ordered'
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      orderId: order.orderId,
      total: order.total,
      timestamp: order.createdAt,
      items: order.items,
      address: order.address,
      paymentMethod: order.paymentMethod,
      status: order.status,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Server error during checkout' });
  }
});

// @route   GET /api/checkout/orders
// @desc    Get user's order history
// @access  Private
router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

// @route   GET /api/checkout/orders/:orderId
// @desc    Get single order details
// @access  Private
router.get('/orders/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId,
      user: req.user._id 
    }).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error fetching order' });
  }
});

// @route   PUT /api/checkout/orders/:orderId/cancel
// @desc    Cancel an order
// @access  Private
router.put('/orders/:orderId/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId,
      user: req.user._id 
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only allow cancellation if order is not already delivered or cancelled
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ message: `Cannot cancel a ${order.status} order` });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error cancelling order' });
  }
});

module.exports = router;
