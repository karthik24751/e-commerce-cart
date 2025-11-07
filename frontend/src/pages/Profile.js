import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';

const Profile = () => {
  const { user: currentUser, token, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      });
      setImagePreview(currentUser.profileImage || null);
    }
    fetchDefaultAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchDefaultAddress = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/address/default', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setDefaultAddress(response.data);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      
      // Add text fields to form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add image file if a new one was selected
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        formDataToSend.append('profileImage', fileInput.files[0]);
      }

      const response = await axios.put(
        process.env.REACT_APP_API_URL + '/auth/profile',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          }
        }
      );

      // Extract user data from response
      const updatedUserData = response.data.user || response.data;
      
      // Update user context if updateUser function is available
      if (typeof updateUser === 'function') {
        updateUser(updatedUserData);
      }
      
      // Update local state
      setFormData({
        name: updatedUserData.name || '',
        email: updatedUserData.email || '',
        phone: updatedUserData.phone || ''
      });
      
      if (updatedUserData.profileImage) {
        setImagePreview(updatedUserData.profileImage);
      }
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="profile-container">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </motion.div>

        <div className="profile-content">
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="profile-image-section">
              <div className="image-upload">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" />
                  ) : (
                    <User size={64} />
                  )}
                </div>
                <label htmlFor="profile-image" className="upload-label">
                  <Camera size={20} />
                  <span>Change Photo</span>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
              {message.text && (
                <div className={'message ' + message.type}>
                  {message.text}
                </div>
              )}

              <div className="form-group">
                <label>
                  <User size={18} />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={18} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Phone size={18} />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
              </div>

              <motion.button
                type="submit"
                className="save-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="address-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="address-header">
              <h2>
                <MapPin size={24} />
                Current Delivery Address
              </h2>
            </div>

            {defaultAddress ? (
              <div className="address-details">
                <p className="address-name">{defaultAddress.fullName}</p>
                <p className="address-text">
                  {defaultAddress.addressLine1}, {defaultAddress.addressLine2 && defaultAddress.addressLine2 + ', '}
                  {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
                </p>
                <p className="address-contact">
                  📞 {defaultAddress.phone} | ✉️ {defaultAddress.email}
                </p>
              </div>
            ) : (
              <div className="no-address">
                <p>No delivery address set</p>
              </div>
            )}

            <motion.button
              className="address-btn"
              onClick={() => navigate('/profile/addresses')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {defaultAddress ? 'Change Delivery Address' : 'Add New Delivery Address'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
