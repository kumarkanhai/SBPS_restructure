const express = require('express');
const { body } = require('express-validator');
const { getAllNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    body('content').notEmpty().withMessage('Content is required')
  ],
  validate,
  createNews
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('image'),
  validate,
  updateNews
);

router.delete('/:id', protect, adminOnly, deleteNews);

module.exports = router;
