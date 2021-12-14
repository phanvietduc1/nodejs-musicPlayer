const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { getArtist } = require('../controllers/artistController');
router.use(bodyParser.json());

router.get('/api/getArtist', getArtist);
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

module.exports = router;