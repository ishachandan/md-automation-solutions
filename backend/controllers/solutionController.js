const Solution = require('../models/Solution');
const slugify = require('../utils/slugify');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all solutions
// @route   GET /api/solutions
// @access  Public
exports.getAllSolutions = async (req, res) => {
  try {
    const { category, industry, featured } = req.query;

    let query = {};
    if (category) query.category = category;
    if (industry) query.industries = industry;
    if (featured) query.featured = featured === 'true';

    const solutions = await Solution.find(query)
      .populate('relatedCaseStudies', 'title slug industry')
      .populate('relatedProducts', 'name slug brand')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: solutions.length,
      data: solutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single solution by slug
// @route   GET /api/solutions/:slug
// @access  Public
exports.getSolution = async (req, res) => {
  try {
    const solution = await Solution.findOne({ slug: req.params.slug })
      .populate('relatedCaseStudies', 'title slug industry clientName')
      .populate('relatedProducts', 'name slug brand category');

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: 'Solution not found'
      });
    }

    res.status(200).json({
      success: true,
      data: solution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new solution
// @route   POST /api/solutions
// @access  Private/Admin
exports.createSolution = async (req, res) => {
  try {
    // Generate slug from name
    const slug = slugify(req.body.name);

    const solution = await Solution.create({
      ...req.body,
      slug
    });

    res.status(201).json({
      success: true,
      data: solution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update solution
// @route   PUT /api/solutions/:id
// @access  Private/Admin
exports.updateSolution = async (req, res) => {
  try {
    // If name is being updated, regenerate slug
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const solution = await Solution.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: 'Solution not found'
      });
    }

    res.status(200).json({
      success: true,
      data: solution
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete solution
// @route   DELETE /api/solutions/:id
// @access  Private/Admin
exports.deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findByIdAndDelete(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: 'Solution not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Solution deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
