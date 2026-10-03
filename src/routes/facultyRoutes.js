const express = require('express');
const { body } = require('express-validator');
const { getAllFaculty, createFaculty, updateFaculty, deleteFaculty, getFacultyById } = require('../controllers/facultyController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllFaculty);
router.get("/:id", getFacultyById);
router.post('/', protect, adminOnly, upload.single('photo'), [body('name').notEmpty().withMessage('Name is required')], validate, createFaculty);
router.put('/:id', protect, adminOnly, upload.single('photo'), validate, updateFaculty);
router.delete('/:id', protect, adminOnly, deleteFaculty);

module.exports = router;
