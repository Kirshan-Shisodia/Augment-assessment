const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware for protecting admin routes
exports.protectAdminRoute = async (req, res, next) => {
  try {
    // Get token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decodedToken.id);

    // Check if user has admin role
    if (user.role !== 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Pass user information to the next middleware
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware for checking user roles
exports.checkUserRole = (roles) => {
  return (req, res, next) => {
    // Get user role from previous middleware
    const userRole = req.user.role;

    // Check if user role is in allowed roles
    if (roles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden' });
  };
};
