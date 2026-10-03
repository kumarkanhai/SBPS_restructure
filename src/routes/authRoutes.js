const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login
} = require("../controllers/authController");
const validate = require('../middleware/validation');
const router = express.Router();

router.post("/register", register);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

module.exports = router;
