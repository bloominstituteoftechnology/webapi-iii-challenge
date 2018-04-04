const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

router.get("/", (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    });
})

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db
    .get(id)
    .then(user => {
        if (user === undefined) {
            res.status(400).json({ error: `User with id ${id} not found.`})
        } else {
            res.status(200).json(user);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

router.get('/:userid/posts', (req, res) => {
    const { userid } = req.params;

    db
    .getUserPosts(userid)
    .then(uposts => {
        res.status(200).json(uposts);
    })
    .catch(error => console.error(error));
})

router.post('/', (req, res) => {
    const { name } = req.body;
    console.log(req.body)
    res.json(req.body)
})

module.exports = router;