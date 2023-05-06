const router = require("express").Router();
const {Song} = require("../../models")

// --> /api/songs/


// get all songs
router.get("/", (req, res) => {
    Song.findAll()
    .then(results => {
        res.json(results)
    })
})

// get songs by artist
router.get("/artist/:name", (req, res) => {
    Song.findAll({
        where: {
            artist: req.params.name
        }
    })
    .then(results => {
        res.json(results)
    })
})

// get songs by genre
router.get("/genre/:name", (req, res) => {
    Song.findAll({
        where: {
            genre: req.params.name
        }
    })
    .then(results => {
        res.json(results)
    })
})
module.exports = router;