const mongoose = require("mongoose");

const favorite = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    songId: {
      type: mongoose.Schema.Types.String,
      ref: "Song",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Favorite", favorite);
