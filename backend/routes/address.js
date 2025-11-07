const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { protect } = require('../middleware/auth');

// Get all addresses for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get default address
router.get('/default', protect, async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user._id, isDefault: true });
    res.json(address);
  } catch (error) {
    console.error('Error fetching default address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new address
router.post('/', protect, async (req, res) => {
  try {
    const { fullName, phone, email, addressLine1, addressLine2, city, state, pincode, country, isDefault } = req.body;

    // If this is set as default, unset other default addresses
    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    const address = new Address({
      user: req.user._id,
      fullName,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country: country || 'India',
      isDefault: isDefault || false
    });

    await address.save();
    res.status(201).json(address);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update address
router.put('/:id', protect, async (req, res) => {
  try {
    const { fullName, phone, email, addressLine1, addressLine2, city, state, pincode, country, isDefault } = req.body;

    // If this is set as default, unset other default addresses
    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id, _id: { $ne: req.params.id } },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        fullName,
        phone,
        email,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
        isDefault
      },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete address
router.delete('/:id', protect, async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Set default address
router.put('/:id/default', protect, async (req, res) => {
  try {
    // Unset all default addresses
    await Address.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } }
    );

    // Set this address as default
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { isDefault: true } },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address);
  } catch (error) {
    console.error('Error setting default address:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
