const express = require('express');
const { body } = require('express-validator');
const { getAllEvents, createEvent, updateEvent, deleteEvent, getEventById } = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', getAllEvents);

router.get("/:id", getEventById);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('date').isISO8601().withMessage('Valid date is required')
  ],
  validate,
  createEvent
);

router.put('/:id', protect, adminOnly, upload.single('image'), validate, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

module.exports = router;
