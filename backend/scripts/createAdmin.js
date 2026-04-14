require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@mdautomation.com' });
    
    if (adminExists) {
      console.log('Admin user already exists!');
      console.log('Email:', adminExists.email);
      console.log('Role:', adminExists.role);
      
      // Update to admin if not already
      if (adminExists.role !== 'admin') {
        adminExists.role = 'admin';
        await adminExists.save();
        console.log('Updated user role to admin');
      }
      
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@mdautomation.com',
      password: 'admin123',
      role: 'admin',
      company: 'MD Automation Solutions',
      phone: '+91 1234567890'
    });

    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
