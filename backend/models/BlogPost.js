const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide excerpt']
  },
  author: {
    type: String,
    default: 'Admin'
  },
  category: {
    type: String
  },
  tags: [{
    type: String
  }],
  featuredImage: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

blogPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (this.published && !this.publishedDate) {
    this.publishedDate = Date.now();
  }
  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
