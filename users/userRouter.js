const express = require("express");
const userDb = require("../data/helpers/userDb.js");
const router = express.Router();


router.get('/users', (req, res) => {
    userDb.get().then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be found"
        })
    })
})



module.exports = router;