const Faculty = require('../models/Faculty');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ active: true }).sort({ order: 1, name: 1 });

    if (faculty.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    } else {
      return res.status(200).json({ message: 'Faculty found', data: faculty });
    }
  } catch (error) {
    console.log('Get faculty error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const id = req.params.id;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found"
      });
    } else {
      return res.status(200).json({
        message: "Faculty found",
        faculty: faculty
      });
    }
  } catch (error) {
    console.log("Get Faculty By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { name, designation, department, bio, order, active } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Faculty name is required' });
    } else {
      let photoUrl = '';

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/faculty');
        photoUrl = result.secure_url;
      }

      const faculty = await Faculty.create({
        name: name,
        designation: designation,
        department: department,
        bio: bio,
        order: order,
        active: active,
        photoUrl: photoUrl
      });

      return res.status(201).json({ message: 'Faculty created', faculty: faculty });
    }
  } catch (error) {
    console.log('Create faculty error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    } else {
      const { name, designation, department, bio, order, active } = req.body;

      if (name !== undefined) faculty.name = name;
      if (designation !== undefined) faculty.designation = designation;
      if (department !== undefined) faculty.department = department;
      if (bio !== undefined) faculty.bio = bio;
      if (order !== undefined) faculty.order = order;
      if (active !== undefined) faculty.active = active;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/faculty');
        faculty.photoUrl = result.secure_url;
      }

      await faculty.save();

      return res.status(200).json({ message: 'Faculty updated', faculty: faculty });
    }
  } catch (error) {
    console.log('Update faculty error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    } else {
      await Faculty.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Faculty deleted successfully' });
    }
  } catch (error) {
    console.log('Delete faculty error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty };
