const express = require("express");
const userDb = require("../data/helpers/userDb.js");
const router = express.Router();


router.get('/users', (req, res) => {
    userDb.get().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({
            error: "The user information could not be found"
        })
    })
})

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    userDb.get(id).then(user => {
        res.json(user);
    }).catch(err => {
        error: "The specified user could not be found"
    })
})



module.exports = router;