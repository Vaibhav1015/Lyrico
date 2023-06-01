const express = require("express");
const favoriteRoute = express();

const {
  addFavorite,
  getUserFavorite,
  deleteUserFavorite,
} = require("../controllers/favoriteController");

favoriteRoute.post("/favorite-lyrics/:userId", addFavorite);
favoriteRoute.get("/user-favorites/:userId", getUserFavorite);
favoriteRoute.delete("/delete-favorite-lyric/:userId", deleteUserFavorite);

module.exports = favoriteRoute;
