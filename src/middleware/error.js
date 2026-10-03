const notFound = (req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  });
};

const errorHandler = (error, req, res, next) => {
  console.log('Server error:', error.message);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      error: error.message
    });
  } else if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID'
    });
  } else if (error.code === 11000) {
    return res.status(409).json({
      message: 'Duplicate value already exists'
    });
  } else if (error.message && error.message.includes('Only JPG')) {
    return res.status(400).json({
      message: error.message
    });
  } else {
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { notFound, errorHandler };
