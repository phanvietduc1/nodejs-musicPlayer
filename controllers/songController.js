const bcrypt = require("bcrypt");
const express = require('express');
const jwt = require("jsonwebtoken");
const ObjectId = require('mongoose').Types.ObjectId;  
const apiResponse = require("../helpers/apiResponse");
const { Song } = require('../models/songModel');

const getSong = async (req, res, next) => {
    Song.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
}

/**
 * getSong.
 *
 * @param {string}      keyword
 *
 * @returns {Object}
 */
 const getSongByKeyWord = async (req, res, next) => {
    const emp = {
        tenBaiHat: new RegExp(req.body.keyword , "i")
    };
    // console.log(req.query.keyword);
    // console.log(req.body.keyword);
    // console.log(req.params.keyword);
    Song.find(emp).limit(100).exec((err, result) => {
        if(!err) {
            res.status(200).json(result)
        } else {
            console.log(err);
        }
    });
}

const getSongByArtist = async (req, res, next) => {
    const emp = {
        idNgheSi: new RegExp('^' + req.body.keyword + '$', "i")
    };

    Song.find(emp).limit(100).exec((err, result) => {
        if(!err) {
            res.status(200).json(result)
        } else {
            console.log(err);
        }
    });
}

const getSongByName = async (req, res, next) => {
    const emp = {
        tenBaiHat: new RegExp('^' + req.body.keyword + '$', "i")
    };

    Song.find(emp).limit(100).exec((err, result) => {
        if(!err) {
            res.status(200).json(result)
        } else {
            console.log(err);
        }
    });
}

const getSongByGenres = async (req, res, next) => {
    const emp = {
        idTheLoai: new RegExp('^' + req.body.keyword + '$', "i")
    };

    Song.find(emp).limit(100).exec((err, result) => {
        if(!err) {
            res.status(200).json(result)
        } else {
            console.log(err);
        }
    });
}

const insertSong = async(req, res, next) => {
    const storage = multer.memoryStorage();
    const upload = multer({storage, limits: {
        fields: 1, // 1 non-file field
        fileSize: 9000000, // 9mb maximum size
        files: 1, // maximum 1 file
        parts: 2 // files + fields
    }})

    const song = {
        image: new RegExp('^' + req.body.image.trim() + '$', "i"),
        songName: new RegExp('^' + req.body.songName.trim() + '$', "i"),
        mp3: new RegExp('^' + req.body.mp3.trim() + '$', "i"),
        likes: new RegExp('^' + req.body.likes.trim() + '$', "i")
    };
    Song.find(song).limit(1).exec((err, song) => {
        if (err){

        } else {
            console.log("insert");
        }
    })
}

module.exports = {
    getSong,
    getSongByKeyWord,
    getSongByArtist,
    getSongByGenres,
    getSongByName
}