const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    coach: { type: String, default: '' },
    image: { type: String, default: '' },
    achievements: [{ type: String }],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
