const express = require('express');
const router = express.Router();
const {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  togglePublish
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Public routes
router.get('/', getAllBlogPosts);
router.get('/:slug', getBlogPost);

// Admin routes
router.post('/', protect, admin, createBlogPost);
router.put('/:id', protect, admin, updateBlogPost);
router.put('/:id/publish', protect, admin, togglePublish);
router.delete('/:id', protect, admin, deleteBlogPost);

module.exports = router;
