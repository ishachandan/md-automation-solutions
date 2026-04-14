const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ].filter(Boolean),
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));
app.use('/api/case-studies', require('./routes/caseStudyRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
