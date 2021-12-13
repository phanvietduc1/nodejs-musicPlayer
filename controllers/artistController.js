const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const { Artist } = require("../models/artistModel");

const getArtist = async (req, res, next) => {
    Artist.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    getArtist
}