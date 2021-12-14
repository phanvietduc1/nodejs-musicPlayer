const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { getSong, getSongByKeyWord, getSongByArtist, getSongByGenres, getSongByName } = require('../controllers/songController');
router.use(bodyParser.json());

router.get('/api/getSong', getSong);
router.post('/api/getSongByKeyWord', getSongByKeyWord);
router.post('/api/getSongByName', getSongByName);
router.post('/api/getSongByArtist', getSongByArtist);
router.post('/api/getSongByGenres', getSongByGenres);
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

module.exports = router;