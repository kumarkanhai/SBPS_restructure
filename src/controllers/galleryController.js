const Gallery = require('../models/Gallery');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });

    if (gallery.length === 0) {
      return res.status(404).json({ message: 'Gallery items not found' });
    } else {
      return res.status(200).json({ message: 'Gallery found', data: gallery });
    }
  } catch (error) {
    console.log('Get gallery error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createGallery = async (req, res) => {
  try {
    const { title, category, caption, featured } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Gallery title is required' });
    } else if (!req.file) {
      return res.status(400).json({ message: 'Gallery image is required' });
    } else {
      const result = await uploadToCloudinary(req.file.buffer, 'sbps/gallery');

      const gallery = await Gallery.create({
        title: title,
        category: category,
        caption: caption,
        featured: featured,
        imageUrl: result.secure_url
      });

      return res.status(201).json({ message: 'Gallery item created', gallery: gallery });
    }
  } catch (error) {
    console.log('Create gallery error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    } else {
      await Gallery.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Gallery item deleted successfully' });
    }
  } catch (error) {
    console.log('Delete gallery error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllGallery, createGallery, deleteGallery };
