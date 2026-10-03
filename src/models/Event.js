const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, default: '' },
    category: { type: String, default: 'School' },
    image: { type: String, default: '' },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
