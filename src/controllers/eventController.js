const Event = require('../models/Event');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ published: true }).sort({ date: 1 });

    if (events.length === 0) {
      return res.status(404).json({ message: 'Events not found' });
    } else {
      return res.status(200).json({ message: 'Events found', data: events });
    }
  } catch (error) {
    console.log('Get events error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    } else {
      return res.status(200).json({
        message: "Event found",
        event: event
      });
    }
  } catch (error) {
    console.log("Get Event By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, endDate, location, category, published } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    } else {
      let image = '';

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/events');
        image = result.secure_url;
      }

      const event = await Event.create({
        title: title,
        description: description,
        date: date,
        endDate: endDate,
        location: location,
        category: category,
        published: published,
        image: image
      });

      return res.status(201).json({ message: 'Event created', event: event });
    }
  } catch (error) {
    console.log('Create event error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    } else {
      const { title, description, date, endDate, location, category, published } = req.body;

      if (title !== undefined) event.title = title;
      if (description !== undefined) event.description = description;
      if (date !== undefined) event.date = date;
      if (endDate !== undefined) event.endDate = endDate;
      if (location !== undefined) event.location = location;
      if (category !== undefined) event.category = category;
      if (published !== undefined) event.published = published;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'sbps/events');
        event.image = result.secure_url;
      }

      await event.save();

      return res.status(200).json({ message: 'Event updated', event: event });
    }
  } catch (error) {
    console.log('Update event error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    } else {
      await Event.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    console.log('Delete event error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
