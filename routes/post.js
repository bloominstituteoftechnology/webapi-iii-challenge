const express = require('express');
const router = express.Router();

const userDB = require("../data/helpers/userDb");
const postDB = require('../data/helpers/postDb');

router.get("/", (req, res) => {
    postDB.get()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.status(500).json({ error: "Error getting posts" });
      });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    userDB.getUserPosts(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting posts" });
        });
});


module.exports = router;