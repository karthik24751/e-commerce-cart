# 🛒 VibeCart - Real-time E-commerce Shopping Experience

![VibeCart Banner](https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=300&fit=crop)

A modern, full-stack e-commerce web application with real-time cart updates, beautiful animations, and multiple theme support. Built with React, Node.js, Express, MongoDB, and Socket.io.

## 📸 Project Showcase

<div align="center">
  <h3>✨ Key Features & Screenshots</h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin: 30px 0;">
    <!-- Image 1 -->
    <div align="center">
      <img src="https://raw.githubusercontent.com/karthik24751/e-commerce-cart/main/images/1.png" alt="Dashboard Overview" style="width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
    </div>
    

  </div>
</div>

<style>
  /* Add smooth hover effects */
  img[alt] {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  img[alt]:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<div
  <p>View more screenshots in the <a href="images/">images directory</a></p>
</div>

## ✨ Features

### 🎨 Frontend Features
- **Modern UI Design** - Beautiful, responsive interface with professional animations
- **5 Color Themes** - Light, Dark, Gradient, Neon, and Pastel themes with instant switching
- **Real-time Updates** - Live cart synchronization using Socket.io
- **Smooth Animations** - Powered by Framer Motion for delightful user experience
- **AI Chat Assistant** - Floating chat bot with pre-defined responses for user queries
- **Responsive Design** - Fully mobile-friendly and works on all screen sizes
- **Protected Routes** - Secure authentication-based navigation

### 🔐 Authentication
- **Secure Login/Signup** - JWT-based authentication with bcrypt password hashing
- **Persistent Sessions** - Token-based session management
- **Protected API Routes** - Middleware-based route protection

### 🛍️ Shopping Features
- **Product Browsing** - Browse 10 curated products with search and filter
- **Shopping Cart** - Add, remove, and update quantities in real-time
- **Live Cart Total** - Instant calculation of totals with tax
- **Checkout System** - Mock checkout with order receipt generation
- **Order History** - View past orders in the dashboard

### 🎯 Dashboard
- **Statistics Cards** - Cart items, total orders, and cart total
- **Recent Orders** - View your latest orders with status
- **Product Recommendations** - Personalized product suggestions
- **Quick Navigation** - Easy access to all features

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18.2.0
- React Router DOM 6.16.0
- Framer Motion 10.16.4
- Socket.io Client 4.7.2
- Axios 1.5.0
- React Hot Toast 2.4.1
- Lucide React 0.284.0

**Backend:**
- Node.js
- Express 4.18.2
- MongoDB with Mongoose 7.5.0
- Socket.io 4.7.2
- JWT (jsonwebtoken 9.0.2)
- Bcrypt.js 2.4.3
- CORS 2.8.5

### Project Structure

```
e-commerce cart/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   ├── Cart.js               # Cart schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── products.js           # Product routes
│   │   ├── cart.js               # Cart routes
│   │   └── checkout.js           # Checkout routes
│   ├── utils/
│   │   ├── generateToken.js      # JWT token generation
│   │   └── seedProducts.js       # Database seeding
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server with Socket.io
│
├── frontend/
│   ├── public/
│   │   ├── index.html            # HTML template
│   │   └── manifest.json         # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   ├── ProductCard.js    # Product display card
│   │   │   ├── ChatAssistant.js  # AI chat assistant
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Authentication state
│   │   │   ├── ThemeContext.js   # Theme management
│   │   │   └── CartContext.js    # Cart state with Socket.io
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Signup.js         # Signup page
│   │   │   ├── Dashboard.js      # User dashboard
│   │   │   ├── Products.js       # Products listing
│   │   │   ├── Cart.js           # Shopping cart
│   │   │   └── Checkout.js       # Checkout & receipt
│   │   ├── styles/
│   │   │   ├── index.css         # Global styles
│   │   │   ├── Auth.css          # Authentication styles
│   │   │   ├── Navbar.css        # Navigation styles
│   │   │   ├── Dashboard.css     # Dashboard styles
│   │   │   ├── Products.css      # Products page styles
│   │   │   ├── ProductCard.css   # Product card styles
│   │   │   ├── Cart.css          # Cart page styles
│   │   │   ├── Checkout.css      # Checkout styles
│   │   │   └── ChatAssistant.css # Chat assistant styles
│   │   ├── App.js                # Main app component
│   │   └── index.js              # React entry point
│   ├── .env                      # Frontend environment variables
│   ├── package.json              # Frontend dependencies
│   └── .gitignore                # Git ignore rules
│
└── README.md                     # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values if needed:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vibecart
   JWT_SECRET=vibecart_secret_key_2024_secure_token
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   # On macOS with Homebrew:
   brew services start mongodb-community

   # Or manually:
   mongod --dbpath /path/to/your/data/directory
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

   The backend will run on `http://localhost:5000`
   Products will be automatically seeded on first run.

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - The `.env` file is already configured:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`
   Your browser will automatically open the application.

## 📱 Usage Guide

### 1. Authentication
- **Sign Up:** Create a new account with name, email, and password
- **Login:** Use your credentials to access the application
- Passwords are securely hashed with bcrypt
- JWT tokens are stored in localStorage for persistent sessions

### 2. Dashboard
- View your cart statistics
- See recent orders with status
- Browse recommended products
- Quick navigation to all features

### 3. Products
- Browse 10 curated products
- Search products by name or description
- Filter by category (Electronics, Fashion, Sports, etc.)
- Switch between grid and list view
- Add products to cart with one click

### 4. Shopping Cart
- View all items in your cart
- Update quantities with +/- buttons
- Remove items individually
- See real-time total calculation
- Cart updates instantly across all tabs (Socket.io)

### 5. Checkout
- Review order summary
- See price breakdown with tax
- Place order (mock payment)
- Receive order receipt with unique order ID
- Order is saved to database

### 6. Theme Switching
- Click the palette icon in the navbar
- Choose from 5 beautiful themes:
  - **Light** - Clean and professional
  - **Dark** - Easy on the eyes
  - **Gradient** - Vibrant and colorful
  - **Neon** - Futuristic and bold
  - **Pastel** - Soft and elegant
- Theme preference is saved in localStorage

### 7. AI Chat Assistant
- Click the floating chat button (bottom-right)
- Ask questions about:
  - How to order
  - Cart location
  - Payment methods
  - Shipping information
  - Return policy
  - Order tracking
  - Theme switching
  - And more!

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout (Protected)
- `POST /api/checkout` - Process checkout
- `GET /api/checkout/orders` - Get order history
- `GET /api/checkout/orders/:orderId` - Get single order

### Health Check
- `GET /api/health` - Server health status

## 🎨 Theme System

VibeCart includes 5 professionally designed themes:

| Theme | Primary Color | Use Case |
|-------|--------------|----------|
| Light | Indigo | Default, professional look |
| Dark | Light Indigo | Night mode, reduced eye strain |
| Gradient | Pink/Purple | Vibrant, modern aesthetic |
| Neon | Cyan/Green | Futuristic, high contrast |
| Pastel | Lavender/Pink | Soft, elegant appearance |

Each theme dynamically updates:
- Background colors
- Text colors
- Border colors
- Button styles
- Card backgrounds
- Gradient overlays

## 🔄 Real-time Features

### Socket.io Implementation
- Automatic connection on user login
- User-specific rooms for isolated updates
- Real-time cart synchronization
- Instant total recalculation
- Toast notifications for updates
- Works across multiple browser tabs

### Events
- `join` - User joins their room
- `cart_update` - Broadcast cart changes
- `cart_updated` - Receive cart updates

## 🎭 Animations

### Framer Motion Animations
- **Page Transitions** - Smooth fade and slide effects
- **Card Hover** - Elevation and scale transforms
- **Button Interactions** - Scale and shadow effects
- **Modal Animations** - Slide and fade for checkout
- **List Animations** - Staggered item appearances
- **Loading States** - Spinner animations
- **Theme Transitions** - Smooth color changes

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Frontend and backend protection
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side validation
- **Error Handling** - Comprehensive error messages

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  rating: Number,
  createdAt: Date
}
```

### Cart
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }],
  updatedAt: Date
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  orderId: String (unique),
  items: [{
    product: ObjectId (ref: Product),
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  status: String,
  createdAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Errors
- Ensure backend is running on port 5000
- Check frontend .env has correct API URL
- Verify CORS is enabled in server.js

### Socket.io Connection Issues
- Check browser console for connection errors
- Verify Socket.io URL in frontend .env
- Ensure backend server is running

## 🚀 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in .env
2. Use a production MongoDB instance (MongoDB Atlas)
3. Update CORS origin to your frontend URL
4. Deploy to Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Update API URLs in .env to production backend
2. Build the app: `npm run build`
3. Deploy to Vercel, Netlify, or AWS S3

## 📝 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Product inventory management
- [ ] Order tracking system
- [ ] Social media authentication
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ by VibeCart Team

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

**Note:** This is a demonstration project. For production use, implement additional security measures, error handling, and testing.

**Happy Shopping! 🛍️**
