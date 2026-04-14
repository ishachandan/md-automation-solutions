const express = require('express');
const router = express.Router();
const {
  getAllCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy
} = require('../controllers/caseStudyController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Public routes
router.get('/', getAllCaseStudies);
router.get('/:slug', getCaseStudy);

// Admin routes
router.post('/', protect, admin, createCaseStudy);
router.put('/:id', protect, admin, updateCaseStudy);
router.delete('/:id', protect, admin, deleteCaseStudy);

module.exports = router;
