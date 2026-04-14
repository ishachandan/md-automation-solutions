const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for security
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new ErrorResponse('Invalid file type. Only JPEG, PNG, PDF, DOC, DOCX are allowed.', 400));
    }
  }
}).single('file');

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Private
exports.uploadFile = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'automation-solutions',
        resource_type: 'auto'
      });

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          fileName: req.file.originalname,
          fileSize: req.file.size
        }
      });
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      next(error);
    }
  });
};
