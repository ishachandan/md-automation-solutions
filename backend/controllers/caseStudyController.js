const CaseStudy = require('../models/CaseStudy');
const slugify = require('../utils/slugify');

// @desc    Get all case studies
// @route   GET /api/case-studies
// @access  Public
exports.getAllCaseStudies = async (req, res) => {
  try {
    const { industry, featured } = req.query;

    let query = {};
    if (industry) query.industry = industry;
    if (featured) query.featured = featured === 'true';

    const caseStudies = await CaseStudy.find(query)
      .sort({ publishedDate: -1 });

    res.status(200).json({
      success: true,
      count: caseStudies.length,
      data: caseStudies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single case study by slug
// @route   GET /api/case-studies/:slug
// @access  Public
exports.getCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug });

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    res.status(200).json({
      success: true,
      data: caseStudy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new case study
// @route   POST /api/case-studies
// @access  Private/Admin
exports.createCaseStudy = async (req, res) => {
  try {
    const slug = slugify(req.body.title);

    const caseStudy = await CaseStudy.create({
      ...req.body,
      slug
    });

    res.status(201).json({
      success: true,
      data: caseStudy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
exports.updateCaseStudy = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    res.status(200).json({
      success: true,
      data: caseStudy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
exports.deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);

    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Case study deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
