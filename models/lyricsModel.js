const mongoose = require("mongoose");

const song = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: false,
    },
    lyrics: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: false,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Song", song);
