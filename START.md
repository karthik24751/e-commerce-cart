# 🚀 Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+): `node --version`
- ✅ MongoDB installed: `mongod --version`
- ✅ npm or yarn: `npm --version`

## Step-by-Step Setup

### 1️⃣ Start MongoDB

**Option A: Using Homebrew (macOS)**
```bash
brew services start mongodb-community
```

**Option B: Manual Start**
```bash
mongod --dbpath /usr/local/var/mongodb
```

**Verify MongoDB is running:**
```bash
# Should show MongoDB process
ps aux | grep mongod
```

---

### 2️⃣ Setup Backend

Open a new terminal window:

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm run dev
```

**Expected Output:**
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

---

### 3️⃣ Setup Frontend

Open another new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the frontend development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view vibecart-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

**Your browser will automatically open to:** `http://localhost:3000`

---

## ✅ Verification Checklist

### Backend (Terminal 1)
- [ ] No error messages
- [ ] "MongoDB Connected" message appears
- [ ] "Products seeded" message appears
- [ ] Server running on port 5000

### Frontend (Terminal 2)
- [ ] No compilation errors
- [ ] "Compiled successfully" message
- [ ] Browser opens automatically
- [ ] Login page loads with animations

### Browser
- [ ] Login page displays correctly
- [ ] No console errors (press F12 → Console tab)
- [ ] Animated background blobs are visible
- [ ] Form inputs are responsive

---

## 🎯 First Time Usage

### Create Your Account

1. Click **"Create Account"** on login page
2. Fill in the form:
   - **Name:** Your Name
   - **Email:** your.email@example.com
   - **Password:** minimum 6 characters
3. Click **"Sign Up"**
4. You'll be automatically logged in and redirected to Dashboard

### Test the Application

1. **Dashboard** - View your stats and recommendations
2. **Products** - Browse 10 curated products
3. **Add to Cart** - Click on any product and add to cart
4. **Cart** - View and manage your cart items
5. **Checkout** - Complete a mock purchase
6. **Themes** - Click palette icon to switch themes
7. **Chat** - Click chat button for AI assistance

---

## 🐛 Troubleshooting

### MongoDB Not Starting

**Error:** `Connection refused` or `ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is installed
mongod --version

# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

---

### Port 5000 Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env
PORT=5001
```

---

### Port 3000 Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Option 1: Kill the process
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
# When prompted, press 'Y' to run on different port
```

---

### Backend Dependencies Issues

**Error:** `Cannot find module` or `npm ERR!`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### Frontend Dependencies Issues

**Error:** `Module not found` or compilation errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### Socket.io Connection Failed

**Error:** Console shows `Socket connection failed`

**Solution:**
1. Ensure backend is running on port 5000
2. Check frontend/.env has correct SOCKET_URL
3. Restart both servers

---

### Products Not Loading

**Issue:** Products page is empty

**Solution:**
1. Check backend terminal for "Products seeded" message
2. Restart backend server
3. Check MongoDB is running
4. Verify API endpoint: `http://localhost:5000/api/products`

---

## 📝 Development Workflow

### Making Changes

**Backend Changes:**
1. Edit files in `backend/` directory
2. Server auto-restarts (nodemon)
3. Refresh browser to see changes

**Frontend Changes:**
1. Edit files in `frontend/src/` directory
2. Browser auto-reloads (hot reload)
3. Changes appear immediately

### Stopping the Application

**Stop Backend:**
- Press `Ctrl + C` in backend terminal

**Stop Frontend:**
- Press `Ctrl + C` in frontend terminal

**Stop MongoDB:**
```bash
brew services stop mongodb-community
```

---

## 🎨 Testing Features

### Test Authentication
```
Email: test@vibecart.com
Password: test123
```
(Create this account first via signup)

### Test Products
- 10 products are pre-seeded
- Categories: Electronics, Fashion, Sports, Lifestyle, Home
- All have images from Unsplash

### Test Themes
1. Click palette icon in navbar
2. Try all 5 themes:
   - Light (default)
   - Dark
   - Gradient
   - Neon
   - Pastel

### Test Real-time Updates
1. Open app in two browser tabs
2. Add item to cart in tab 1
3. Watch cart update in tab 2 (Socket.io)

### Test Chat Assistant
1. Click floating chat button
2. Try these queries:
   - "how to order"
   - "where is my cart"
   - "payment methods"
   - "shipping"
   - "help"

---

## 🌐 API Testing

### Using Browser
```
http://localhost:5000/api/health
http://localhost:5000/api/products
```

### Using curl
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@vibecart.com","password":"test123"}'
```

---

## 📊 Monitoring

### Backend Logs
Watch terminal 1 for:
- API requests
- Database operations
- Socket.io connections
- Errors and warnings

### Frontend Console
Press F12 in browser:
- **Console:** JavaScript logs and errors
- **Network:** API calls and responses
- **Application:** LocalStorage (token, theme)

### MongoDB
```bash
# Connect to MongoDB shell
mongosh

# Use VibeCart database
use vibecart

# View collections
show collections

# View products
db.products.find().pretty()

# View users
db.users.find().pretty()
```

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ **Backend Terminal shows:**
- MongoDB Connected
- Products seeded
- Server running on port 5000
- Socket.io enabled

✅ **Frontend Terminal shows:**
- Compiled successfully
- No errors or warnings

✅ **Browser shows:**
- Beautiful login page with animations
- No console errors
- Smooth theme transitions
- Real-time cart updates
- Working chat assistant

---

## 🚀 Next Steps

1. **Explore the App** - Try all features
2. **Read the README** - Comprehensive documentation
3. **Check DEMO_GUIDE** - Create a demo video
4. **Customize** - Modify themes, add features
5. **Deploy** - Host on Heroku, Vercel, etc.

---

## 💡 Pro Tips

1. **Keep terminals organized** - Label them clearly
2. **Use browser dev tools** - Essential for debugging
3. **Check console regularly** - Catch errors early
4. **Test on mobile** - Use responsive mode
5. **Clear cache** - If things look broken
6. **Restart servers** - When in doubt

---

## 📞 Need Help?

- Check **README.md** for detailed documentation
- Review **DEMO_GUIDE.md** for feature walkthrough
- Inspect browser console for errors
- Check backend terminal for API logs
- Verify MongoDB is running

---

**Happy Coding! 🎉**

Remember: Both backend and frontend must be running simultaneously for the app to work properly.
