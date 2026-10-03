const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    } else {
      next();
    }
  } catch (error) {
    console.log('Validation middleware error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = validate;
