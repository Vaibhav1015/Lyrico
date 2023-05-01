const song = require("../models/lyricsModel");

//Add new song to database
const addSong = async(req,res) =>{
    try {
        const newSong = new song({
            title:req.body.title,
            artist:req.body.artist,
            lyrics:req.body.lyrics
        })
        if (newSong) {
            const saveSong = await newSong.save();
            res.status(200).send({success:true,msg:"Song added successfully",data:saveSong});  
        } else {
            res.status(400).send({success:false,msg:"Failed to add new song"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//Edit song details using song ID 
const editSong = async(req,res) => {
    try {
        const songId = req.params.songId;
        const checkSong = await song.findOneAndUpdate({_id:songId},{$set:req.body},{new:true});
        if (checkSong) {
            res.status(200).send({success:true,msg:"Song details updated successfully",data:checkSong});
            
        } else {
            res.status(400).send({success:false,msg:"Failed to edit the changes"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//Delete song details using song ID
const deleteSong = async(req,res) => {
    try {
        const songId = req.params.songId;
        const checkSong = await song.findOneAndDelete({_id:songId})
        if (checkSong) {
            res.status(200).send({success:true,msg:"Song details deleted successfully"})
        } else {
            res.status(400).send({success:false,msg:"Failed to delete the song details"})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Get all song data 
const allSong = async(req,res) => {
    try {
        const songData = await song.find().sort({ createdAt: -1 });
        if (songData) {
            res.status(200).send({success:true,msg:"All song data",data:songData});
            
        } else {
            res.status(400).send({success:false,msg:"Something went wrong, Please try again.."});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};


//Get song details by songID 
const singleSong = async(req,res) => {
    try {
        const songId = req.params.songId;
        const checkSong = await song.findOne({_id:songId});
        if (checkSong) {
            res.status(200).send({success:true,msg:"Your song details",data:checkSong});
            
        } else {
            res.status(400).send({success:false,msg:"Check Id details ,Data not found."})
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Search song by title 
const searchSong = async(req,res) => {
    try {
        const title = req.params.title;
        const searchSong = await song.find({title: { $regex: title, $options: 'i' }});
        if (searchSong) {
            res.status(200).send({success:true,msg:"Your search song results",data:searchSong});
        } else {
            res.status(400).send({success:false,msg:"Can't find your search result"});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSong,
    editSong,
    deleteSong,
    allSong,
    singleSong,
    searchSong
  };