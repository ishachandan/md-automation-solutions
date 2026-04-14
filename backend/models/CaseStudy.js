const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
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
  clientName: {
    type: String,
    default: 'Confidential Client'
  },
  industry: {
    type: String,
    required: [true, 'Please select industry']
  },
  solutionType: {
    type: String,
    required: [true, 'Please provide solution type']
  },
  country: {
    type: String
  },
  challenge: {
    type: String,
    required: [true, 'Please describe the challenge']
  },
  solution: {
    type: String,
    required: [true, 'Please describe the solution']
  },
  technologies: [{
    type: String
  }],
  results: {
    type: String
  },
  images: [{
    type: String
  }],
  videoUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedDate: {
    type: Date,
    default: Date.now
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

caseStudySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
