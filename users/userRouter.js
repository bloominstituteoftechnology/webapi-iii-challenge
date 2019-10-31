const express = require('express');

const db = require("./userDb");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: "Failed to add new user to database." }))
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {
    const newUser = req.body;

    if (!newUser) {
        res.status(400).json({ errorMessage: "Missing user data." })
    } else if (!newUser.name) {
        res.status(400).json({ errorMessage: "Missing required name field." })
    } else next();
};

function validatePost(req, res, next) {

};

module.exports = router;
