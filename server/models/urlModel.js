const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    urlCode: {
      type: String,
      required: true,
      unique: true, // enforce uniqueness
      index: true, // improve query performance
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Url', urlSchema);
