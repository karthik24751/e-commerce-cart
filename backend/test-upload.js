const axios = require('axios');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Test user details
const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'test1234',
  phone: '1234567890'
};

const API_URL = 'http://localhost:5000/api/auth';

// Create test user directly in database
async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: TEST_USER.email });
    
    if (!existingUser) {
      // Create new user
      const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);
      const newUser = new User({
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: hashedPassword,
        phone: TEST_USER.phone
      });
      
      await newUser.save();
      console.log('✅ Test user created successfully!');
    } else {
      console.log('ℹ️ Test user already exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
    return false;
  }
}

// Test profile update
async function testProfileUpdate() {
  try {
    // 1. First, ensure test user exists
    await createTestUser();
    
    // 2. Login to get token
    console.log('\nLogging in...');
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    
    const token = loginRes.data.token;
    console.log('✅ Login successful!');
    
    // 3. Update profile
    console.log('\nUpdating profile...');
    const updateData = {
      name: 'Updated Test User',
      email: TEST_USER.email,
      phone: '9876543210'  // Changed phone number
    };
    
    const updateRes = await axios.put(
      `${API_URL}/profile`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('✅ Profile update successful!');
    console.log('\nUpdated Profile:', JSON.stringify(updateRes.data, null, 2));
    
  } catch (error) {
    console.error('\n❌ Error:', {
      message: error.message,
      response: error.response?.data || 'No response data',
      status: error.response?.status
    });
  }
}

// Run the test
console.log('🚀 Starting profile update test...');
testProfileUpdate();
