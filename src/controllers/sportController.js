const Sport = require('../models/Sport');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.find({ active: true }).sort({ name: 1 });

    if (sports.length === 0) {
      return res.status(404).json({ message: 'Sports not found' });
    } else {
      return res.status(200).json({ message: 'Sports found', data: sports });
    }
  } catch (error) {
    console.log('Get sports error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSport = async (req, res) => {
  try {
    const { name, description, coach, achievements, active } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Sport name is required' });
    } else {
      let image = '';

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/sports');
        image = result.secure_url;
      }

      let achievementList = achievements;

      if (typeof achievements === 'string') {
        achievementList = achievements.split(',').map((item) => item.trim());
      }

      const sport = await Sport.create({
        name: name,
        description: description,
        coach: coach,
        achievements: achievementList,
        active: active,
        image: image
      });

      return res.status(201).json({ message: 'Sport created', sport: sport });
    }
  } catch (error) {
    console.log('Create sport error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    } else {
      const { name, description, coach, achievements, active } = req.body;

      if (name !== undefined) sport.name = name;
      if (description !== undefined) sport.description = description;
      if (coach !== undefined) sport.coach = coach;
      if (active !== undefined) sport.active = active;

      if (achievements !== undefined) {
        if (typeof achievements === 'string') {
          sport.achievements = achievements.split(',').map((item) => item.trim());
        } else {
          sport.achievements = achievements;
        }
      }

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/sports');
        sport.image = result.secure_url;
      }

      await sport.save();

      return res.status(200).json({ message: 'Sport updated', sport: sport });
    }
  } catch (error) {
    console.log('Update sport error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    } else {
      await Sport.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Sport deleted successfully' });
    }
  } catch (error) {
    console.log('Delete sport error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSportById = async (req, res) => {
  try {
    const id = req.params.id;

    const sport = await Sport.findById(id);

    if (!sport) {
      return res.status(404).json({
        message: "Sport not found"
      });
    } else {
      return res.status(200).json({
        message: "Sport found",
        sport: sport
      });
    }
  } catch (error) {
    console.log("Get Sport By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { getAllSports, createSport, updateSport, deleteSport, getSportById };
