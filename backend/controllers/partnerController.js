const ChannelPartner = require('../models/ChannelPartner');
const Product = require('../models/Product');
const CaseStudy = require('../models/CaseStudy');

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
exports.getAllPartners = async (req, res) => {
  try {
    const {
      partnershipType,
      specialization,
      country,
      search,
      sortBy = 'priority',
      order = 'desc'
    } = req.query;

    // Build query
    let query = { active: true };

    if (partnershipType) {
      query.partnershipType = partnershipType;
    }

    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    if (country) {
      query.country = country;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const partners = await ChannelPartner.find(query)
      .select('-relatedProducts -relatedCaseStudies')
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get featured partners
// @route   GET /api/partners/featured
// @access  Public
exports.getFeaturedPartners = async (req, res) => {
  try {
    const partners = await ChannelPartner.find({ featured: true, active: true })
      .select('name logo slug partnershipType shortDescription')
      .sort({ priority: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single partner by slug
// @route   GET /api/partners/:slug
// @access  Public
exports.getPartnerBySlug = async (req, res) => {
  try {
    const partner = await ChannelPartner.findOne({
      slug: req.params.slug,
      active: true
    })
      .populate('relatedProducts', 'name slug images brand category')
      .populate('relatedCaseStudies', 'title slug industry images');

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create partner
// @route   POST /api/partners
// @access  Private/Admin
exports.createPartner = async (req, res) => {
  try {
    const partner = await ChannelPartner.create(req.body);

    res.status(201).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update partner
// @route   PUT /api/partners/:id
// @access  Private/Admin
exports.updatePartner = async (req, res) => {
  try {
    const partner = await ChannelPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete partner
// @route   DELETE /api/partners/:id
// @access  Private/Admin
exports.deletePartner = async (req, res) => {
  try {
    const partner = await ChannelPartner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Toggle featured status
// @route   PATCH /api/partners/:id/toggle-featured
// @access  Private/Admin
exports.toggleFeatured = async (req, res) => {
  try {
    const partner = await ChannelPartner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }

    partner.featured = !partner.featured;
    await partner.save();

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Toggle active status
// @route   PATCH /api/partners/:id/toggle-active
// @access  Private/Admin
exports.toggleActive = async (req, res) => {
  try {
    const partner = await ChannelPartner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }

    partner.active = !partner.active;
    await partner.save();

    res.status(200).json({
      success: true,
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get products by partner
// @route   GET /api/partners/:id/products
// @access  Public
exports.getPartnerProducts = async (req, res) => {
  try {
    const products = await Product.find({ partnerId: req.params.id })
      .select('name slug images brand category description');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get partner statistics
// @route   GET /api/partners/stats
// @access  Private/Admin
exports.getPartnerStats = async (req, res) => {
  try {
    const totalPartners = await ChannelPartner.countDocuments({ active: true });
    const featuredPartners = await ChannelPartner.countDocuments({ featured: true, active: true });

    const partnersByType = await ChannelPartner.aggregate([
      { $match: { active: true } },
      { $group: { _id: '$partnershipType', count: { $sum: 1 } } }
    ]);

    const countries = await ChannelPartner.distinct('country', { active: true });

    res.status(200).json({
      success: true,
      data: {
        totalPartners,
        featuredPartners,
        partnersByType,
        countriesRepresented: countries.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
