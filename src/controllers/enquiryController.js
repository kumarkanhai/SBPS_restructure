const Enquiry = require('../models/Enquiry');

const createEnquiry = async (req, res) => {
  try {
    const { studentName, parentName, email, phone, className, message } = req.body;

    if (!studentName || !parentName || !phone) {
      return res.status(400).json({ message: 'Student name, parent name and phone are required' });
    } else {
      const enquiry = await Enquiry.create({
        studentName: studentName,
        parentName: parentName,
        email: email,
        phone: phone,
        className: className,
        message: message
      });

      return res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: enquiry });
    }
  } catch (error) {
    console.log('Create enquiry error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEnquiryById = async (req, res) => {
  try {
    const id = req.params.id;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found"
      });
    } else {
      return res.status(200).json({
        message: "Enquiry found",
        enquiry: enquiry
      });
    }
  } catch (error) {
    console.log("Get Enquiry By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    if (enquiries.length === 0) {
      return res.status(404).json({ message: 'Enquiries not found' });
    } else {
      return res.status(200).json({ message: 'Enquiries found', data: enquiries });
    }
  } catch (error) {
    console.log('Get enquiries error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    } else {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: 'Status is required' });
      } else {
        enquiry.status = status;
        await enquiry.save();

        return res.status(200).json({ message: 'Enquiry updated', enquiry: enquiry });
      }
    }
  } catch (error) {
    console.log('Update enquiry error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const id = req.params.id;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found"
      });
    } else {
      return res.status(200).json({
        message: "Enquiry deleted successfully",
        enquiry: enquiry
      });
    }
  } catch (error) {
    console.log("Delete Enquiry Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = { createEnquiry, getEnquiryById, getAllEnquiries, updateEnquiry, deleteEnquiry };
