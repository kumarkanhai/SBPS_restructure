const express = require('express');
const { body } = require('express-validator');
const { getAllGallery, createGallery, deleteGallery } = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllGallery);
router.post('/', protect, adminOnly, upload.single('image'), [body('title').notEmpty().withMessage('Title is required')], validate, createGallery);
router.delete('/:id', protect, adminOnly, deleteGallery);

module.exports = router;
