const song = require("../models/lyricsModel");
const User = require("../models/userModel");

//Add new song to database
const addSong = async (req, res) => {
  try {
    const newSong = new song({
      userId: req.params.userId,
      title: req.body.title,
      artist: req.body.artist,
      category: req.body.category,
      lyrics: req.body.lyrics,
      videoLink: req.body.videoLink,
    });
    const userData = await User.findOne({ _id: req.params.userId });
    if (userData) {
      const saveSong = await newSong.save();
      res.status(200).send({
        success: true,
        msg: "Song added successfully",
        data: saveSong,
      });
    } else {
      res.status(400).send({ success: false, msg: "Failed to add new song" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Edit song details using song ID
const editSong = async (req, res) => {
  try {
    const songId = req.body.songId;
    const checkSong = await song.findOneAndUpdate(
      { _id: songId },
      { $set: req.body },
      { new: true }
    );
    if (checkSong) {
      res.status(200).send({
        success: true,
        msg: "Song details updated successfully",
        data: checkSong,
      });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Failed to edit the changes" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Delete song details using song ID
const deleteSong = async (req, res) => {
  try {
    const songId = req.body.songId;
    const checkSong = await song.findOneAndDelete({ _id: songId });
    if (checkSong) {
      res
        .status(200)
        .send({ success: true, msg: "Song details deleted successfully" });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Failed to delete the song details" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get all song data
const allSong = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page - 1) * pageSize;
    const songData = await song
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    if (songData) {
      res
        .status(200)
        .send({ success: true, msg: "All song data", results: songData });
    } else {
      res.status(400).send({
        success: false,
        msg: "Something went wrong, Please try again..",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get song details by songID
const singleSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    const checkSong = await song.findOne({ _id: songId });
    if (checkSong) {
      res
        .status(200)
        .send({ success: true, msg: "Your song details", data: checkSong });
    } else {
      res
        .status(400)
        .send({ success: false, msg: "Check Id details ,Data not found." });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Search song by title
const searchSong = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page - 1) * pageSize;
    const title = req.params.title;

    const searchSong = await song
      .find({ title: { $regex: title, $options: "i" } })
      .skip(skip)
      .limit(pageSize);
    if (searchSong.length === 0) {
      res
        .status(400)
        .send({ success: false, msg: "Can't find your search result" });
    } else {
      res.status(200).send({
        success: true,
        msg: "Your search song results",
        data: searchSong,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Filter lyrics category wise
const categoryFilter = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page - 1) * pageSize;
    const category = req.params.category;

    const categorySong = await song
      .find({ category: category })
      .skip(skip)
      .limit(pageSize);
    if (categorySong.length === 0) {
      res
        .status(400)
        .send({ success: false, msg: "Can't find your search result" });
    } else {
      res.status(200).send({
        success: true,
        msg: "Your search song results",
        data: categorySong,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addSong,
  editSong,
  deleteSong,
  allSong,
  singleSong,
  searchSong,
  categoryFilter,
};
