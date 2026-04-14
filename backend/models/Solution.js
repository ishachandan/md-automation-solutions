const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide solution name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Please select a category']
  },
  industries: [{
    type: String
  }],
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  shortDescription: {
    type: String
  },
  features: [{
    type: String
  }],
  applications: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  images: [{
    type: String
  }],
  brochureUrl: {
    type: String
  },
  relatedCaseStudies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy'
  }],
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  featured: {
    type: Boolean,
    default: false
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

solutionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Solution', solutionSchema);
