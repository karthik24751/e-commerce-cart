const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vibecart/profile',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

// Create multer upload instance with better error handling
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    try {
      if (!file) {
        console.error('No file received in the request');
        return cb(new Error('No file received'), false);
      }
      
      if (file.mimetype.startsWith('image/')) {
        console.log('File accepted:', file.originalname, 'Type:', file.mimetype);
        cb(null, true);
      } else {
        console.error('Invalid file type:', file.mimetype);
        cb(new Error('Only image files are allowed! (jpg, jpeg, png)'), false);
      }
    } catch (error) {
      console.error('Error in file filter:', error);
      cb(error, false);
    }
  }
}).single('profileImage');

// Add error handling middleware
const handleUpload = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      // Handle multer errors
      console.error('Multer upload error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Max 5MB allowed.' });
      } else if (err.message.includes('file type')) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }
    next();
  });
};

module.exports = {
  upload: multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    }
  }),
  handleUpload
};
