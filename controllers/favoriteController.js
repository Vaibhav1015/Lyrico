const song = require("../models/lyricsModel");
const User = require("../models/userModel");
const favorite = require("../models/favoriteModel");

// Add lyrics to favorites using userID

const addFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const songId = req.body.songId;
    const userIdCheck = await User.findById({ _id: userId });
    const songIdCheck = await song.findById({ _id: songId });

    const { lyrics, title, artist } = songIdCheck;
    const getLyrics = new Object({ lyrics, title, artist });

    const newFavorite = new favorite({
      userId: userId,
      songId: songId,
      lyricsData: getLyrics,
    });
    if (userIdCheck && songIdCheck) {
      await newFavorite.save();
      res.status(200).send({
        success: true,
        msg: "Song added to favorites successfully",
        data: newFavorite,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Failed to add favorite song" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get favorite lyrics by userId

const getUserFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const UserFavorites = await favorite.find({ userId: userId });

    if (UserFavorites.length > 0) {
      res.status(200).send({
        success: true,
        msg: "User favorite Lyrics",
        data: UserFavorites,
      });
    } else {
      res.status(400).send({ success: false, msg: "Data not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Delete favorite lyrics by userId

const deleteUserFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const songId = req.body.songId;
    const checkUser = await favorite.findOneAndDelete({
      $and: [{ userId: userId }, { songId: songId }],
    });
    if (checkUser) {
      const response = {
        success: true,
        msg: "User favorite lyric deleted",
        data: checkUser,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: "ID details are incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addFavorite, getUserFavorite, deleteUserFavorite };
