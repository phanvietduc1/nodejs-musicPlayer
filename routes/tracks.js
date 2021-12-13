const { Router } = require("express");
const router = Router();

const { getTrack, uploadTrack } = require('../controllers/tracksController')

router.get("/:trackID", getTrack);

router.post('/', uploadTrack);

router.post('/save', (req, res, next) => {
    console.log("check");
});

module.exports = router;