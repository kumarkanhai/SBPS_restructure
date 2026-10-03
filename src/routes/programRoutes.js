const express = require('express');
const { body } = require('express-validator');
const { getAllPrograms, createProgram, updateProgram, deleteProgram, getProgramById } = require('../controllers/programController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllPrograms);
router.get("/:id", getProgramById);
router.post('/', protect, adminOnly, upload.single('image'), [body('title').notEmpty().withMessage('Title is required'), body('slug').notEmpty().withMessage('Slug is required'), body('description').notEmpty().withMessage('Description is required')], validate, createProgram);
router.put('/:id', protect, adminOnly, upload.single('image'), validate, updateProgram);
router.delete('/:id', protect, adminOnly, deleteProgram);

module.exports = router;
