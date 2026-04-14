const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide industry name'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  challenges: [{
    type: String
  }],
  icon: {
    type: String
  },
  bannerImage: {
    type: String
  },
  solutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  caseStudies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaseStudy'
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Industry', industrySchema);
