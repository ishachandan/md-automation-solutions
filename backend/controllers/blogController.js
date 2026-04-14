const BlogPost = require('../models/BlogPost');
const slugify = require('../utils/slugify');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
exports.getAllBlogPosts = async (req, res) => {
  try {
    const { category, tag, published } = req.query;

    let query = {};
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (published !== undefined) query.published = published === 'true';
    else query.published = true; // Default: only show published posts to public

    const blogPosts = await BlogPost.find(query)
      .sort({ publishedDate: -1 });

    res.status(200).json({
      success: true,
      count: blogPosts.length,
      data: blogPosts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
exports.getBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    // Increment views
    blogPost.views += 1;
    await blogPost.save();

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private/Admin
exports.createBlogPost = async (req, res) => {
  try {
    const slug = slugify(req.body.title);

    const blogPost = await BlogPost.create({
      ...req.body,
      slug
    });

    res.status(201).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
exports.updateBlogPost = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Toggle publish status
// @route   PUT /api/blog/:id/publish
// @access  Private/Admin
exports.togglePublish = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    blogPost.published = !blogPost.published;
    if (blogPost.published && !blogPost.publishedDate) {
      blogPost.publishedDate = Date.now();
    }
    await blogPost.save();

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
