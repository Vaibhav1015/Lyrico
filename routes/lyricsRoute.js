const express = require("express");
const lyricsRoute = express();
const {addSong, editSong, deleteSong, allSong, singleSong, searchSong} = require("../controllers/lyricsController");

lyricsRoute.post("/add-song",addSong);
lyricsRoute.put("/edit-song/:songId",editSong);
lyricsRoute.delete("/delete-song/:songId",deleteSong);
lyricsRoute.get("/all-song",allSong);
lyricsRoute.get("/single-song/:songId",singleSong);
lyricsRoute.get("/songs/search/:title",searchSong);

module.exports = lyricsRoute;