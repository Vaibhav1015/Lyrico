const express = require("express");
const favoriteRoute = express();

const {
  addFavorite,
  getUserFavorite,
  deleteUserFavorite,
} = require("../controllers/favoriteController");

favoriteRoute.post("/:userId/favorite-lyrics", addFavorite);
favoriteRoute.get("/:userId/user-favorites", getUserFavorite);
favoriteRoute.delete("/:userId/delete-favorite-lyric", deleteUserFavorite);

module.exports = favoriteRoute;
