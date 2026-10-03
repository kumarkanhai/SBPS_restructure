const News = require('../models/News');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllNews = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const safeLimit = Math.min(limit, 100);
    const news = await News.find({ published: true }).sort({ publishedAt: -1 }).limit(safeLimit);

    if (news.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    } else {
      return res.status(200).json({ message: 'News found', data: news });
    }
  } catch (error) {
    console.log('Get news error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    } else {
      return res.status(200).json({ message: 'News found', news: news });
    }
  } catch (error) {
    console.log('Get news by id error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, featured, published } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: 'Title, slug and content are required' });
    } else {
      let imageUrl = '';

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/news');
        imageUrl = result.secure_url;
      }

      const news = await News.create({
        title: title,
        slug: slug,
        excerpt: excerpt,
        content: content,
        category: category,
        featured: featured,
        published: published,
        image: imageUrl
      });

      return res.status(201).json({ message: 'News created', news: news });
    }
  } catch (error) {
    console.log('Create news error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    } else {
      const { title, slug, excerpt, content, category, featured, published } = req.body;

      if (title !== undefined) news.title = title;
      if (slug !== undefined) news.slug = slug;
      if (excerpt !== undefined) news.excerpt = excerpt;
      if (content !== undefined) news.content = content;
      if (category !== undefined) news.category = category;
      if (featured !== undefined) news.featured = featured;
      if (published !== undefined) news.published = published;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/news');
        news.image = result.secure_url;
      }

      await news.save();

      return res.status(200).json({ message: 'News updated', news: news });
    }
  } catch (error) {
    console.log('Update news error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    } else {
      await News.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'News deleted successfully' });
    }
  } catch (error) {
    console.log('Delete news error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };
