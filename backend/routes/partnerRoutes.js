const express = require('express');
const router = express.Router();
const {
  getAllPartners,
  getFeaturedPartners,
  getPartnerBySlug,
  createPartner,
  updatePartner,
  deletePartner,
  toggleFeatured,
  toggleActive,
  getPartnerProducts,
  getPartnerStats
} = require('../controllers/partnerController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/', getAllPartners);
router.get('/featured', getFeaturedPartners);
router.get('/stats', protect, admin, getPartnerStats);
router.get('/:slug', getPartnerBySlug);
router.post('/', protect, admin, createPartner);
router.put('/:id', protect, admin, updatePartner);
router.delete('/:id', protect, admin, deletePartner);
router.patch('/:id/toggle-featured', protect, admin, toggleFeatured);
router.patch('/:id/toggle-active', protect, admin, toggleActive);
router.get('/:id/products', getPartnerProducts);

module.exports = router;
