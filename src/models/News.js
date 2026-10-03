const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    category: { type: String, default: "School" },
    publishedAt: { type: Date, default: Date.now },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
