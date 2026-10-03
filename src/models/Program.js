const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['JEE', 'NEET', 'DEFENCE', 'ACADEMIC', 'OTHER'], default: 'ACADEMIC' },
    image: { type: String, default: '' },
    features: [{ type: String }],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
