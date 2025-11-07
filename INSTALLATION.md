# 🔧 Complete Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Running the Application](#running-the-application)
4. [Verification](#verification)
5. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

#### 1. Node.js (v14 or higher)
**Check if installed:**
```bash
node --version
```

**Install if needed:**
- **macOS:** Download from [nodejs.org](https://nodejs.org) or use Homebrew:
  ```bash
  brew install node
  ```
- **Windows:** Download from [nodejs.org](https://nodejs.org)
- **Linux:** 
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

#### 2. MongoDB (v4.4 or higher)
**Check if installed:**
```bash
mongod --version
```

**Install if needed:**
- **macOS:**
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  ```
- **Windows:** Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Linux:**
  ```bash
  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  ```

#### 3. npm (comes with Node.js)
**Check version:**
```bash
npm --version
```

---

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd "/Users/srinivasarao/Desktop/e-commerce cart"
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

**Expected output:**
```
added 150+ packages in 30s
```

**Packages installed:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- socket.io
- axios
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

**Expected output:**
```
added 1500+ packages in 2m
```

**Packages installed:**
- react & react-dom
- react-router-dom
- axios
- socket.io-client
- framer-motion
- react-hot-toast
- lucide-react
- react-scripts

### Step 4: Verify Environment Files

**Backend (.env):**
```bash
cd ../backend
cat .env
```

Should contain:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibecart
JWT_SECRET=vibecart_secret_key_2024_secure_token
NODE_ENV=development
```

**Frontend (.env):**
```bash
cd ../frontend
cat .env
```

Should contain:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

---

## Running the Application

### Terminal Setup
You'll need **3 terminal windows/tabs**:
1. MongoDB
2. Backend Server
3. Frontend Server

### Terminal 1: Start MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Manual start (all platforms):**
```bash
mongod --dbpath /usr/local/var/mongodb
```

**Verify MongoDB is running:**
```bash
ps aux | grep mongod
```

You should see a MongoDB process running.

---

### Terminal 2: Start Backend Server

```bash
cd "/Users/srinivasarao/Desktop/e-commerce cart/backend"
npm run dev
```

**Expected output:**
```
╔═══════════════════════════════════════════╗
║                                           ║
║       🛒 VibeCart API Server 🛒          ║
║                                           ║
║   Server running on port 5000            ║
║   Environment: development               ║
║                                           ║
║   📡 Socket.io enabled                    ║
║   🗄️  MongoDB connected                   ║
║                                           ║
╚═══════════════════════════════════════════╝

✅ MongoDB Connected: localhost
✅ Sample products seeded successfully
```

**Backend is ready when you see:**
- ✅ MongoDB Connected
- ✅ Products seeded
- ✅ Server running on port 5000

**Keep this terminal running!**

---

### Terminal 3: Start Frontend Server

```bash
cd "/Users/srinivasarao/Desktop/e-commerce cart/frontend"
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view vibecart-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

webpack compiled successfully
```

**Browser will automatically open to:** `http://localhost:3000`

**Keep this terminal running!**

---

## Verification

### 1. Check Backend Health
Open browser and visit:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "VibeCart API is running",
  "timestamp": "2024-..."
}
```

### 2. Check Products API
```
http://localhost:5000/api/products
```

Should return array of 10 products.

### 3. Check Frontend
```
http://localhost:3000
```

Should show beautiful login page with:
- ✅ Animated background blobs
- ✅ Login form
- ✅ "Create Account" link
- ✅ No console errors (press F12)

### 4. Test Complete Flow

#### Create Account
1. Click "Create Account"
2. Fill form:
   - Name: Test User
   - Email: test@vibecart.com
   - Password: test123
3. Click "Sign Up"
4. Should redirect to Dashboard

#### Browse Products
1. Click "Products" in navbar
2. Should see 10 products
3. Try search: type "headphones"
4. Try filter: select "Electronics"

#### Add to Cart
1. Hover over any product
2. Click "Add to Cart"
3. See toast notification
4. Cart badge updates in navbar

#### View Cart
1. Click "Cart" in navbar
2. See added items
3. Try +/- buttons
4. Watch total update

#### Checkout
1. Click "Proceed to Checkout"
2. Review order
3. Click "Place Order"
4. See success screen with receipt

#### Theme Switching
1. Click palette icon in navbar
2. Try all 5 themes
3. Watch smooth transitions

#### Chat Assistant
1. Click floating chat button (bottom-right)
2. Type: "how to order"
3. See response
4. Try other queries

---

## Common Issues

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**

1. **Check if MongoDB is running:**
   ```bash
   ps aux | grep mongod
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

3. **Check MongoDB logs:**
   ```bash
   tail -f /usr/local/var/log/mongodb/mongo.log
   ```

4. **Try different MongoDB URI:**
   Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/vibecart
   ```

---

### Issue 2: Port 5000 Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

1. **Find and kill the process:**
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. **Or use different port:**
   Edit `backend/.env`:
   ```env
   PORT=5001
   ```
   
   Then update `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_SOCKET_URL=http://localhost:5001
   ```

---

### Issue 3: Port 3000 Already in Use

**Error:** `Something is already running on port 3000`

**Solutions:**

1. **Kill the process:**
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Or press 'Y' when prompted** to run on different port

---

### Issue 4: Module Not Found

**Error:** `Cannot find module 'express'` or similar

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 5: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**

1. **Verify backend is running** on port 5000

2. **Check frontend .env:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Restart both servers**

---

### Issue 6: Socket.io Not Connecting

**Error:** Console shows `Socket connection failed`

**Solutions:**

1. **Check backend terminal** for Socket.io initialization

2. **Verify frontend .env:**
   ```env
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

3. **Clear browser cache** and reload

4. **Check browser console** for specific error

---

### Issue 7: Products Not Loading

**Issue:** Products page is empty

**Solutions:**

1. **Check backend terminal** for "Products seeded" message

2. **Manually seed products:**
   ```bash
   # In MongoDB shell
   mongosh
   use vibecart
   db.products.countDocuments()
   ```

3. **Restart backend server** (products auto-seed on start)

4. **Check API directly:**
   ```
   http://localhost:5000/api/products
   ```

---

### Issue 8: Authentication Not Working

**Issue:** Can't login or signup

**Solutions:**

1. **Check backend terminal** for errors

2. **Verify JWT_SECRET** in `backend/.env`

3. **Clear localStorage:**
   - Open browser console (F12)
   - Type: `localStorage.clear()`
   - Reload page

4. **Check MongoDB users collection:**
   ```bash
   mongosh
   use vibecart
   db.users.find()
   ```

---

### Issue 9: Styles Not Loading

**Issue:** Page looks broken or unstyled

**Solutions:**

1. **Clear browser cache:**
   - Chrome: Cmd+Shift+Delete (Mac) or Ctrl+Shift+Delete (Windows)
   - Select "Cached images and files"
   - Click "Clear data"

2. **Hard reload:**
   - Chrome: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

3. **Check browser console** for CSS errors

4. **Restart frontend server**

---

### Issue 10: npm Install Fails

**Error:** Various npm errors during installation

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

3. **Delete lock files and retry:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Use different registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

---

## Troubleshooting Commands

### Check Running Processes
```bash
# Check what's running on port 5000
lsof -i :5000

# Check what's running on port 3000
lsof -i :3000

# Check MongoDB process
ps aux | grep mongod
```

### MongoDB Commands
```bash
# Start MongoDB
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community

# Restart MongoDB
brew services restart mongodb-community

# Check MongoDB status
brew services list | grep mongodb
```

### View Logs
```bash
# Backend logs (in backend terminal)
# Already visible

# MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Frontend logs (in frontend terminal)
# Already visible
```

### Database Management
```bash
# Connect to MongoDB shell
mongosh

# Use VibeCart database
use vibecart

# View all collections
show collections

# Count products
db.products.countDocuments()

# View all products
db.products.find().pretty()

# Count users
db.users.countDocuments()

# Drop database (CAUTION!)
db.dropDatabase()
```

---

## Post-Installation Checklist

- [ ] MongoDB is running
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3000
- [ ] Browser opens automatically to login page
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] No errors in browser console (F12)
- [ ] Can create account
- [ ] Can login
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Can switch themes
- [ ] Chat assistant works

---

## Quick Commands Reference

### Start Everything
```bash
# Terminal 1
brew services start mongodb-community

# Terminal 2
cd backend && npm run dev

# Terminal 3
cd frontend && npm start
```

### Stop Everything
```bash
# Press Ctrl+C in backend terminal
# Press Ctrl+C in frontend terminal
brew services stop mongodb-community
```

### Reset Everything
```bash
# Stop all services
brew services stop mongodb-community

# Clear MongoDB data (CAUTION!)
mongosh
use vibecart
db.dropDatabase()
exit

# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install

# Restart everything
brew services start mongodb-community
cd backend && npm run dev
cd frontend && npm start
```

---

## Getting Help

If you're still experiencing issues:

1. **Check the README.md** for detailed documentation
2. **Review START.md** for quick start guide
3. **Check browser console** (F12) for errors
4. **Check backend terminal** for API errors
5. **Verify all prerequisites** are installed
6. **Try the reset procedure** above

---

## Success Indicators

You'll know everything is working when:

✅ **3 terminals running:**
   - MongoDB (no errors)
   - Backend (showing API requests)
   - Frontend (compiled successfully)

✅ **Browser shows:**
   - Beautiful login page
   - Smooth animations
   - No console errors

✅ **Can complete full flow:**
   - Create account → Login → Browse → Add to cart → Checkout

✅ **All features work:**
   - Theme switching
   - Real-time cart updates
   - Chat assistant
   - Search and filters

---

**Installation Complete! 🎉**

Proceed to [START.md](START.md) for usage instructions or [DEMO_GUIDE.md](DEMO_GUIDE.md) to create a demo video.
