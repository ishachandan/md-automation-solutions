const mongoose = require('mongoose');

const channelPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide partner name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  logo: {
    type: String,
    required: [true, 'Please provide partner logo']
  },
  bannerImage: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  shortDescription: {
    type: String,
    maxlength: 150
  },
  country: {
    type: String
  },
  founded: {
    type: Number
  },
  website: {
    type: String
  },
  partnershipType: {
    type: String,
    enum: ['Authorized Distributor', 'System Integrator Partner', 'Technology Partner', 'Preferred Supplier'],
    required: [true, 'Please select partnership type']
  },
  partnerSince: {
    type: Number
  },
  specializations: [{
    type: String
  }],
  industries: [{
    type: String
  }],
  productCategories: [{
    type: String
  }],
  certifications: [{
    type: String
  }],
  awards: [{
    title: String,
    year: Number,
    description: String
  }],
  supportEmail: {
    type: String
  },
  supportPhone: {
    type: String
  },
  catalogUrl: {
    type: String
  },
  brochureUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  },
  stats: {
    yearsInBusiness: Number,
    globalPresence: String,
    productRange: String,
    customerBase: String
  },
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
    youtube: String
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  relatedCaseStudies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy'
  }],
  active: {
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

// Update updatedAt on save
channelPartnerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ChannelPartner', channelPartnerSchema);
