const Enquiry = require('../models/Enquiry');
const generateEnquiryId = require('../utils/generateEnquiryId');
const sendEmail = require('../utils/sendEmail');
const { enquiryConfirmationEmail, enquiryNotificationEmail, enquiryStatusUpdateEmail } = require('../utils/emailTemplates');

// @desc    Submit new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res) => {
  try {
    // Generate unique enquiry ID
    const enquiryId = generateEnquiryId();

    // Create enquiry
    const enquiry = await Enquiry.create({
      ...req.body,
      enquiryId,
      userId: req.user ? req.user.id : null
    });

    // Send confirmation email to client
    try {
      await sendEmail({
        to: enquiry.email,
        subject: `Enquiry Confirmation - ${enquiryId}`,
        html: enquiryConfirmationEmail(enquiry)
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Enquiry Received - ${enquiryId}`,
        html: enquiryNotificationEmail(enquiry)
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    res.status(201).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
exports.getAllEnquiries = async (req, res) => {
  try {
    const { status, industry, projectType, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (industry) query.industry = industry;
    if (projectType) query.projectType = projectType;
    if (search) {
      query.$or = [
        { enquiryId: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const enquiries = await Enquiry.find(query)
      .populate('userId', 'name email')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user's enquiries
// @route   GET /api/enquiries/user/:userId
// @access  Private
exports.getUserEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get logged-in user's own enquiries
// @route   GET /api/enquiries/my-enquiries
// @access  Private
exports.getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private
exports.getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('userId', 'name email company phone')
      .populate('statusHistory.updatedBy', 'name');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    // Update status
    enquiry.status = status;

    // Add to status history
    enquiry.statusHistory.push({
      status,
      updatedBy: req.user.id,
      notes
    });

    await enquiry.save();

    // Send status update email to client
    try {
      await sendEmail({
        to: enquiry.email,
        subject: `Enquiry Status Update - ${enquiry.enquiryId}`,
        html: enquiryStatusUpdateEmail(enquiry, status)
      });
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Add admin notes
// @route   POST /api/enquiries/:id/notes
// @access  Private/Admin
exports.addAdminNotes = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    enquiry.adminNotes = req.body.notes;
    await enquiry.save();

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Upload quote PDF
// @route   POST /api/enquiries/:id/quote
// @access  Private/Admin
exports.uploadQuote = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    enquiry.quoteUrl = req.body.quoteUrl;
    enquiry.status = 'quote_sent';

    // Add to status history
    enquiry.statusHistory.push({
      status: 'quote_sent',
      updatedBy: req.user.id,
      notes: 'Quote uploaded'
    });

    await enquiry.save();

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private/Admin
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        error: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get enquiry statistics
// @route   GET /api/enquiries/stats
// @access  Private/Admin
exports.getEnquiryStats = async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    
    const statusCounts = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const industryBreakdown = await Enquiry.aggregate([
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('enquiryId companyName industry status createdAt');

    res.status(200).json({
      success: true,
      data: {
        totalEnquiries,
        statusCounts,
        industryBreakdown,
        recentEnquiries
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get detailed analytics for admin dashboard
// @route   GET /api/enquiries/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res, next) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();

    const statusCounts = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const industryCounts = await Enquiry.aggregate([
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const monthlyTrendsData = await Enquiry.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format monthlyTrends to be easier for frontend chart
    const monthlyTrends = monthlyTrendsData.map(item => ({
      year: item._id.year,
      month: item._id.month,
      name: `${item._id.month}/${item._id.year}`,
      count: item.count
    }));

    const wonCount = await Enquiry.countDocuments({ status: 'won' });
    const lostCount = await Enquiry.countDocuments({ status: 'lost' });
    const conversionStats = {
      won: wonCount,
      lost: lostCount,
      total: totalEnquiries,
      rate: totalEnquiries > 0 ? parseFloat(((wonCount / totalEnquiries) * 100).toFixed(2)) : 0
    };

    res.status(200).json({
      success: true,
      data: {
        totalEnquiries,
        statusCounts,
        industryCounts,
        monthlyTrends,
        conversionStats
      }
    });
  } catch (error) {
    if (next) return next(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
