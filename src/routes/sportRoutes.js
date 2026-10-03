const express = require('express');
const { body } = require('express-validator');
const { getAllSports, createSport, updateSport, deleteSport, getSportById } = require('../controllers/sportController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllSports);
router.get("/:id", getSportById);
router.post('/', protect, adminOnly, upload.single('image'), [body('name').notEmpty().withMessage('Sport name is required')], validate, createSport);
router.put('/:id', protect, adminOnly, upload.single('image'), validate, updateSport);
router.delete('/:id', protect, adminOnly, deleteSport);

module.exports = router;
