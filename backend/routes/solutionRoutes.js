const express = require('express');
const router = express.Router();
const {
  getAllSolutions,
  getSolution,
  createSolution,
  updateSolution,
  deleteSolution
} = require('../controllers/solutionController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// Public routes
router.get('/', getAllSolutions);
router.get('/:slug', getSolution);

// Admin routes
router.post('/', protect, admin, createSolution);
router.put('/:id', protect, admin, updateSolution);
router.delete('/:id', protect, admin, deleteSolution);

module.exports = router;
