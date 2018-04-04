const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb.js");


router.get("/", (req, res) => {
    db
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.get("/:id", (req, res) => {
    db
        .get(req.params.id)
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;
