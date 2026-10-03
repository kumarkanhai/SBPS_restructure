const Program = require("../models/Program");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ active: true }).sort({ title: 1 });

    if (programs.length === 0) {
      return res.status(404).json({ message: "Programs not found" });
    } else {
      return res
        .status(200)
        .json({ message: "Programs found", data: programs });
    }
  } catch (error) {
    console.log("Get programs error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


const getProgramById = async (req, res) => {
  try {
    const id = req.params.id;

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        message: "Program not found",
      });
    } else {
      return res.status(200).json({
        message: "Program found",
        program: program,
      });
    }
  } catch (error) {
    console.log("Get Program By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const createProgram = async (req, res) => {
  try {
    const { title, slug, description, category, features, active } = req.body;

    if (!title || !slug || !description) {
      return res
        .status(400)
        .json({ message: "Title, slug and description are required" });
    } else {
      let image = "";

      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer,
          "sbps/programs",
        );
        image = result.secure_url;
      }

      let featureList = features;

      if (typeof features === "string") {
        featureList = features.split(",").map((item) => item.trim());
      }

      const program = await Program.create({
        title: title,
        slug: slug,
        description: description,
        category: category,
        features: featureList,
        active: active,
        image: image,
      });

      return res
        .status(201)
        .json({ message: "Program created", program: program });
    }
  } catch (error) {
    console.log("Create program error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    } else {
      const { title, slug, description, category, features, active } = req.body;

      if (title !== undefined) program.title = title;
      if (slug !== undefined) program.slug = slug;
      if (description !== undefined) program.description = description;
      if (category !== undefined) program.category = category;
      if (active !== undefined) program.active = active;

      if (features !== undefined) {
        if (typeof features === "string") {
          program.features = features.split(",").map((item) => item.trim());
        } else {
          program.features = features;
        }
      }

      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer,
          "sbps/programs",
        );
        program.image = result.secure_url;
      }

      await program.save();

      return res
        .status(200)
        .json({ message: "Program updated", program: program });
    }
  } catch (error) {
    console.log("Update program error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    } else {
      await Program.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Program deleted successfully" });
    }
  } catch (error) {
    console.log("Delete program error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
