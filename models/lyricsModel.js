const mongoose = require("mongoose");

const song = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      lyrics: {
        type: String,
        required: true
      },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Song", song);
