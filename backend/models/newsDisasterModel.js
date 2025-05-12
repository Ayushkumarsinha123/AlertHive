const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      trim: true,
      default: null,
    },
    content: {
      type: String,
      trim: true,
      default: null,
    },
    link: {
      type: String,
      required: [true, "An article must have a link"],
    },
    time: Date,
    fetchedAt: { type: Date, default: Date.now() },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    lat: {
      type: Number,
      default: null,
    },
    lng: {
      type: Number,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

NewsSchema.virtual("casualties").get(function () {
  const injuries = Math.floor(Math.random() * 11);
  const death = Math.floor(Math.random() * 6);
  return { injuries, death };
});

const NewsArticle = mongoose.model("NewsArticle", NewsSchema);

module.exports = NewsArticle;
