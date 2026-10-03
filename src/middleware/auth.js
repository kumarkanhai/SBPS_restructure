const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'Authentication required' });
    } else if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Use Bearer token' });
    } else {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    } else if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    } else {
      next();
    }
  } catch (error) {
    console.log('Admin middleware error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { protect, adminOnly };
