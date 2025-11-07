const Product = require('../models/Product');

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    stock: 50,
    rating: 4.8
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life. Stay connected and healthy.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Electronics",
    stock: 75,
    rating: 4.6
  },
  {
    name: "Designer Backpack",
    description: "Stylish and functional backpack with laptop compartment, water-resistant material, and ergonomic design. Perfect for travel and daily use.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    category: "Fashion",
    stock: 100,
    rating: 4.7
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard with customizable keys, tactile switches, and programmable macros. Enhance your gaming experience.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    category: "Electronics",
    stock: 60,
    rating: 4.9
  },
  {
    name: "Yoga Mat Premium",
    description: "Eco-friendly yoga mat with extra cushioning, non-slip surface, and carrying strap. Perfect for yoga, pilates, and fitness.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    category: "Sports",
    stock: 120,
    rating: 4.5
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    category: "Lifestyle",
    stock: 200,
    rating: 4.6
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof Bluetooth speaker with 360° sound, 20-hour battery, and deep bass. Perfect for outdoor adventures.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "Electronics",
    stock: 85,
    rating: 4.7
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors. Soft, breathable, and eco-friendly.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "Fashion",
    stock: 150,
    rating: 4.4
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with touch control, multiple brightness levels, and USB charging port. Eye-friendly lighting.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    category: "Home",
    stock: 90,
    rating: 4.5
  },
  {
    name: "Wireless Mouse Ergonomic",
    description: "Ergonomic wireless mouse with adjustable DPI, silent clicks, and long battery life. Comfortable for extended use.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    category: "Electronics",
    stock: 110,
    rating: 4.6
  },
  {
    name: "Matte Lipstick Set",
    description: "Long-lasting matte lipstick set with 12 vibrant shades. Smudge-proof, transfer-proof, and enriched with vitamin E for soft, moisturized lips.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
    category: "Beauty",
    stock: 200,
    rating: 4.7
  },
  {
    name: "Eyeshadow Palette Pro",
    description: "Professional eyeshadow palette with 35 highly pigmented shades. Includes matte, shimmer, and metallic finishes for endless eye looks.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    category: "Beauty",
    stock: 150,
    rating: 4.8
  },
  {
    name: "Foundation & Concealer Kit",
    description: "Full coverage foundation and concealer duo. Lightweight, buildable formula that lasts all day. Available in 20 shades for all skin tones.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80",
    category: "Beauty",
    stock: 180,
    rating: 4.6
  },
  {
    name: "Makeup Brush Set Professional",
    description: "Premium 15-piece makeup brush set with synthetic bristles. Includes face and eye brushes with elegant rose gold handles and storage case.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    category: "Beauty",
    stock: 120,
    rating: 4.9
  },
  {
    name: "Skincare Routine Set",
    description: "Complete 5-step skincare set: cleanser, toner, serum, moisturizer, and sunscreen. Natural ingredients for glowing, healthy skin.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
    category: "Beauty",
    stock: 100,
    rating: 4.8
  },
  {
    name: "Designer Sunglasses",
    description: "Trendy polarized sunglasses with UV400 protection. Lightweight metal frame with gradient lenses. Perfect for any face shape.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    category: "Fashion",
    stock: 90,
    rating: 4.5
  },
  {
    name: "Leather Wallet Premium",
    description: "Genuine leather wallet with RFID blocking technology. Multiple card slots, coin pocket, and bill compartment. Slim and elegant design.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "Fashion",
    stock: 130,
    rating: 4.7
  },
  {
    name: "Running Shoes Athletic",
    description: "Lightweight running shoes with breathable mesh upper and responsive cushioning. Perfect for running, gym, and everyday wear.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Fashion",
    stock: 160,
    rating: 4.8
  },
  {
    name: "Denim Jacket Classic",
    description: "Timeless denim jacket with vintage wash. Comfortable fit with button closure and chest pockets. Perfect layering piece for any season.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    category: "Fashion",
    stock: 85,
    rating: 4.6
  },
  {
    name: "Perfume Luxury Collection",
    description: "Elegant eau de parfum with floral and woody notes. Long-lasting fragrance in a beautiful glass bottle. Perfect gift for any occasion.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
    category: "Beauty",
    stock: 70,
    rating: 4.9
  }
];

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products seeded successfully');
    } else {
      console.log('ℹ️  Products already exist in database');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

module.exports = seedProducts;
