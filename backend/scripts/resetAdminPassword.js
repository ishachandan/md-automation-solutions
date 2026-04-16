require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@mdautomation.com' });
    
    if (!admin) {
      console.log('Admin user not found! Run createAdmin.js first.');
      process.exit(1);
    }

    // Reset password
    admin.password = 'admin123';
    await admin.save();

    console.log('✓ Admin password reset successfully!');
    console.log('Email: admin@mdautomation.com');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetAdminPassword();
