const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    department: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    bio: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
