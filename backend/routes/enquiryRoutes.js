const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getUserEnquiries,
  getMyEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  addAdminNotes,
  uploadQuote,
  deleteEnquiry,
  getEnquiryStats,
  getAnalytics
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.post('/', createEnquiry);
router.get('/', protect, admin, getAllEnquiries);
router.get('/analytics', protect, admin, getAnalytics);
router.get('/stats', protect, admin, getEnquiryStats);
router.get('/my-enquiries', protect, getMyEnquiries);
router.get('/user/:userId', protect, getUserEnquiries);
router.get('/:id', protect, getEnquiry);
router.put('/:id/status', protect, admin, updateEnquiryStatus);
router.post('/:id/notes', protect, admin, addAdminNotes);
router.post('/:id/quote', protect, admin, uploadQuote);
router.delete('/:id', protect, admin, deleteEnquiry);

module.exports = router;
