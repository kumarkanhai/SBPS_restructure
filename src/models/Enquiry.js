const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    className: { type: String, default: '' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['NEW', 'CONTACTED', 'CLOSED'], default: 'NEW' }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
