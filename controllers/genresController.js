const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");
const { Genres } = require("../models/genresModel");

const getGenres = async (req, res, next) => {
    Genres.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    getGenres
}