const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const { Playlist } = require("../models/playlistModel");

const getPlaylist = async (req, res, next) => {
    Playlist.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    getPlaylist
}