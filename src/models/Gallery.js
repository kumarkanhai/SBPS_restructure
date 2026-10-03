const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'Campus' },
    caption: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
