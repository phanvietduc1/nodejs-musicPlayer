const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;  
const fs = require('fs');  
const { User } = require('../models/userModel');
const bodyParser = require('body-parser');
const { Song } = require('../models/songModel');
const { getUser, register, login, loginByHash, logout, confirmOtp, resetPassword, changePassword, resendOTP } = require('../controllers/userController');
const { getSong, getSongByKeyWord, getSongByArtist, getSongByGenres, getSongByName } = require('../controllers/songController');
const { getArtist } = require('../controllers/artistController');
const { getGenres } = require('../controllers/genresController');
const { getPlaylist } = require('../controllers/playlistController');

router.use(bodyParser.json());

router.get('/api/getSong', getSong);
router.post('/api/getSongByKeyWord', getSongByKeyWord);
router.post('/api/getSongByName', getSongByName);
router.post('/api/getSongByArtist', getSongByArtist);
router.post('/api/getSongByGenres', getSongByGenres);
router.get('/api/getArtist', getArtist);
router.get('/api/getGenres', getGenres);
router.get('/api/getPlaylist', getPlaylist);

router.get('/api/user', getUser);
router.post('/api/user/register', register);
router.post('/api/user/login', login);
router.post('/api/user/loginByHash', loginByHash);
router.post('/api/user/logout', logout);
router.post('/api/user/changePassword', changePassword);
router.post('/api/user/confirmOtp', confirmOtp);
router.post('/api/user/resetPassword', resetPassword);
router.post('/api/user/resendOTP', resendOTP);

router.get('/open_songImage', (req, res, next) => {
    let imgName = "uploadsImg/song/" + req.query.imgName;
    fs.readFile(imgName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `Cannot read image. Err is : ${err}`
            });
        }
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        res.end(imageData);
    });
});

router.get('/open_genresImage', (req, res, next) => {
    let imgName = "uploadsImg/genres/" + req.query.imgName;
    fs.readFile(imgName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `Cannot read image. Err is : ${err}`
            });
        }
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        res.end(imageData);
    });
});

router.get('/open_artistImage', (req, res, next) => {
    let imgName = "uploadsImg/artist/" + req.query.imgName;
    fs.readFile(imgName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `Cannot read image. Err is : ${err}`
            });
        }
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        res.end(imageData);
    });
});

router.get('/open_mp3', (req, res, next) => {
    let imgName = "uploadsMp3/" + req.query.imgName;
    fs.readFile(imgName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `Cannot read image. Err is : ${err}`
            });
        }
        res.writeHead(200, {'Content-Type' : 'mp3/m4a'});
        res.end(imageData);
    });
});

router.get('/open_playlistImage', (req, res, next) => {
    let imgName = "uploadsImg/playlist/" + req.query.imgName;
    fs.readFile(imgName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                message: `Cannot read image. Err is : ${err}`
            });
        }
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        res.end(imageData);
    });
});

module.exports = router;