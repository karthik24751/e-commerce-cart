import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, CreditCard, CheckCircle, ArrowLeft, Plus, 
  Edit, Trash2, Home, Building, User, Phone, Mail 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import '../styles/CheckoutComplete.css';

const CheckoutComplete = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { cart, clearCart } = useCart();
  
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'upi', name: 'UPI', icon: Phone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: Home, description: 'Pay when you receive' }
  ];

  useEffect(() => {
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/products');
      return;
    }
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/address`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses(response.data);
      
      // Auto-select default address
      const defaultAddr = response.data.find(addr => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr._id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/address`,
        addressForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Address saved successfully!');
      setAddresses([...addresses, response.data]);
      setSelectedAddress(response.data._id);
      setShowAddressForm(false);
      
      // Reset form
      setAddressForm({
        fullName: user?.name || '',
        phone: '',
        email: user?.email || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
    } catch (error) {
      toast.error('Failed to save address');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAddresses(addresses.filter(addr => addr._id !== id));
      if (selectedAddress === id) {
        setSelectedAddress(null);
      }
      toast.success('Address deleted');
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const proceedToPayment = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }

    setLoading(true);

    try {
      const selectedAddr = addresses.find(addr => addr._id === selectedAddress);
      
      const orderData = {
        items: cart.items,
        total: cart.total,
        address: selectedAddr,
        paymentMethod: selectedPayment
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkout`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderDetails(response.data);
      await clearCart();
      setStep(3);
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div>
      <Navbar />
      <div className="checkout-complete-container">
        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <span>Address</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Confirmation</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: ADDRESS SELECTION */}
          {step === 1 && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="checkout-content"
            >
              <div className="checkout-main">
                <div className="section-header">
                  <h2><MapPin size={24} /> Delivery Address</h2>
                  <button 
                    className="add-address-btn"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                  >
                    <Plus size={20} /> Add New Address
                  </button>
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="address-form"
                    onSubmit={handleSaveAddress}
                  >
                    <div className="form-grid">
                      <div className="form-group">
                        <label><User size={16} /> Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label><Phone size={16} /> Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label><Mail size={16} /> Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={addressForm.email}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label><Home size={16} /> Address Line 1 *</label>
                        <input
                          type="text"
                          name="addressLine1"
                          value={addressForm.addressLine1}
                          onChange={handleAddressFormChange}
                          placeholder="House No., Building Name"
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Address Line 2</label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={addressForm.addressLine2}
                          onChange={handleAddressFormChange}
                          placeholder="Road Name, Area, Colony"
                        />
                      </div>

                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>State *</label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={addressForm.pincode}
                          onChange={handleAddressFormChange}
                          required
                        />
                      </div>

                      <div className="form-group checkbox-group full-width">
                        <label>
                          <input
                            type="checkbox"
                            name="isDefault"
                            checked={addressForm.isDefault}
                            onChange={handleAddressFormChange}
                          />
                          Set as default address
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="button" onClick={() => setShowAddressForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Address'}
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Saved Addresses */}
                <div className="addresses-list">
                  {addresses.length === 0 ? (
                    <div className="empty-addresses">
                      <MapPin size={48} />
                      <p>No saved addresses</p>
                      <button onClick={() => setShowAddressForm(true)}>
                        Add Your First Address
                      </button>
                    </div>
                  ) : (
                    addresses.map(address => (
                      <motion.div
                        key={address._id}
                        className={`address-card ${selectedAddress === address._id ? 'selected' : ''}`}
                        onClick={() => setSelectedAddress(address._id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address._id}
                          onChange={() => setSelectedAddress(address._id)}
                        />
                        <div className="address-details">
                          <h4>{address.fullName} {address.isDefault && <span className="default-badge">Default</span>}</h4>
                          <p>{address.addressLine1}, {address.addressLine2}</p>
                          <p>{address.city}, {address.state} - {address.pincode}</p>
                          <p className="contact">📞 {address.phone} | ✉️ {address.email}</p>
                        </div>
                        <div className="address-actions">
                          <button onClick={(e) => { e.stopPropagation(); /* Edit logic */ }}>
                            <Edit size={16} />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="checkout-sidebar">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-items">
                    {cart.items.map(item => (
                      <div key={item._id} className="summary-item">
                        <img src={item.product.image} alt={item.product.name} />
                        <div>
                          <p>{item.product.name}</p>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <p className="item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="summary-totals">
                    <div className="total-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="total-row">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="total-row grand-total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    className="proceed-btn"
                    onClick={proceedToPayment}
                    disabled={!selectedAddress}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT SELECTION */}
          {step === 2 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="checkout-content"
            >
              <div className="checkout-main">
                <button className="back-btn" onClick={() => setStep(1)}>
                  <ArrowLeft size={20} /> Back to Address
                </button>

                <div className="section-header">
                  <h2><CreditCard size={24} /> Payment Method</h2>
                </div>

                <div className="payment-methods">
                  {paymentMethods.map(method => (
                    <motion.div
                      key={method.id}
                      className={`payment-card ${selectedPayment === method.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPayment(method.id)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === method.id}
                        onChange={() => setSelectedPayment(method.id)}
                      />
                      <method.icon size={32} />
                      <div>
                        <h4>{method.name}</h4>
                        <p>{method.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedPayment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="payment-note"
                  >
                    <p>✅ This is a mock payment. Your order will be placed without actual payment.</p>
                  </motion.div>
                )}
              </div>

              <div className="checkout-sidebar">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-totals">
                    <div className="total-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="total-row">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="total-row grand-total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    className="proceed-btn"
                    onClick={handlePlaceOrder}
                    disabled={!selectedPayment || loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {step === 3 && orderDetails && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="success-screen"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle size={80} className="success-icon" />
              </motion.div>
              <h1>Order Placed Successfully!</h1>
              <p>Thank you for your purchase</p>

              <div className="order-receipt">
                <h3>Order Details</h3>
                <div className="receipt-row">
                  <span>Order ID:</span>
                  <strong>{orderDetails.orderId}</strong>
                </div>
                <div className="receipt-row">
                  <span>Total Amount:</span>
                  <strong>${typeof orderDetails.total === 'number' ? orderDetails.total.toFixed(2) : orderDetails.total}</strong>
                </div>
                <div className="receipt-row">
                  <span>Payment Method:</span>
                  <strong>{paymentMethods.find(m => m.id === selectedPayment)?.name}</strong>
                </div>
                <div className="receipt-row">
                  <span>Status:</span>
                  <strong className="status-badge">{orderDetails.status}</strong>
                </div>
              </div>

              <div className="success-actions">
                <button onClick={() => navigate('/products')}>
                  Continue Shopping
                </button>
                <button onClick={() => navigate('/dashboard')} className="primary">
                  View Orders
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutComplete;
