const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const bodyParser = require('body-parser');
const { getGenres } = require('../controllers/genresController');
router.use(bodyParser.json());

router.get('/api/getGenres', getGenres);
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

module.exports = router;