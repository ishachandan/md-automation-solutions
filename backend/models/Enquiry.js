const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    unique: true,
    required: true
  },
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  contactPerson: {
    type: String,
    required: [true, 'Please provide contact person name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  industry: {
    type: String,
    required: [true, 'Please select an industry']
  },
  projectType: {
    type: String,
    enum: ['New Installation', 'Retrofit', 'Upgrade'],
    required: [true, 'Please select project type']
  },
  requirements: {
    type: String,
    required: [true, 'Please provide project requirements']
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileSize: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  budgetRange: {
    type: String,
    enum: ['Under $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', 'Above $500k', '']
  },
  timeline: {
    type: String,
    enum: ['Urgent (< 1 month)', '1-3 months', '3-6 months', '6-12 months', 'Beyond 12 months']
  },
  status: {
    type: String,
    enum: ['received', 'under_review', 'quote_sent', 'won', 'lost'],
    default: 'received'
  },
  adminNotes: {
    type: String
  },
  quoteUrl: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  statusHistory: [{
    status: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
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
enquirySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Enquiry', enquirySchema);
