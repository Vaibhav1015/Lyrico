const express = require("express");
const lyricsRoute = express();
const {
  addSong,
  editSong,
  deleteSong,
  allSong,
  singleSong,
  searchSong,
  categoryFilter,
} = require("../controllers/lyricsController");

const { isAdmin } = require("../middleware/auth");

lyricsRoute.post("/add-song/:userId", isAdmin, addSong);
lyricsRoute.put("/edit-song/:userId", isAdmin, editSong);
lyricsRoute.delete("/delete-song/:userId", isAdmin, deleteSong);
lyricsRoute.get("/all-song", allSong);
lyricsRoute.get("/single-song/:songId", singleSong);
lyricsRoute.get("/songs/search/:title", searchSong);
lyricsRoute.get("/songs/:category", categoryFilter);

module.exports = lyricsRoute;
