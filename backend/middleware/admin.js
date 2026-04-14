const ErrorResponse = require('../utils/errorResponse');

// Middleware to check if user is admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return next(new ErrorResponse('Access denied. Admin privileges required.', 403));
  }
};

