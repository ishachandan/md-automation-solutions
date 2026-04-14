const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand name']
  },
  category: {
    type: String,
    required: [true, 'Please select category']
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  specifications: {
    type: Map,
    of: String
  },
  images: [{
    type: String
  }],
  datasheetUrl: {
    type: String
  },
  manualUrl: {
    type: String
  },
  industries: [{
    type: String
  }],
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChannelPartner'
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
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

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
