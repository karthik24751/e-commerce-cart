import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/AddressManagement.css';

const AddressManagement = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/address', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          process.env.REACT_APP_API_URL + '/address/' + editingId,
          formData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      } else {
        await axios.post(
          process.env.REACT_APP_API_URL + '/address',
          formData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      }
      fetchAddresses();
      resetForm();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await axios.delete(process.env.REACT_APP_API_URL + '/address/' + id, {
          headers: { Authorization: 'Bearer ' + token }
        });
        fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_URL + '/address/' + id + '/default',
        {},
        { headers: { Authorization: 'Bearer ' + token } }
      );
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="address-management-container">
        <motion.div
          className="address-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Manage Addresses</h1>
          <motion.button
            className="add-address-btn"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add New Address
          </motion.button>
        </motion.div>

        {showForm && (
          <motion.div
            className="address-form-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address Line 1 *</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />
                  Set as default address
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="addresses-list">
          {addresses.length === 0 ? (
            <div className="no-addresses">
              <MapPin size={64} />
              <p>No addresses saved yet</p>
              <button onClick={() => setShowForm(true)}>Add Your First Address</button>
            </div>
          ) : (
            addresses.map((address, index) => (
              <motion.div
                key={address._id}
                className={'address-card' + (address.isDefault ? ' default' : '')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {address.isDefault && (
                  <div className="default-badge">
                    <Check size={16} />
                    Default
                  </div>
                )}
                <div className="address-info">
                  <h3>{address.fullName}</h3>
                  <p className="address-text">
                    {address.addressLine1}, {address.addressLine2 && address.addressLine2 + ', '}
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="contact-info">
                    📞 {address.phone} | ✉️ {address.email}
                  </p>
                </div>
                <div className="address-actions">
                  {!address.isDefault && (
                    <button
                      className="action-btn default-btn"
                      onClick={() => handleSetDefault(address._id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(address)}
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(address._id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressManagement;
