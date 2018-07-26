const express = require('express');
const router = express.Router();
const userDb = require('../../data/helpers/userDb');


//GET USERS
router.get('/', (req, res, next) => {
    userDb.get()
        .then(userData => {
            res.status(200).json(userData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The users could not be retrieved."
            })
        })
});
//GET SPECIFIC USER
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    userDb.get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The specific user could not be retrieved."
            })
        })
});

//GET POSTS FOR SPECIFIC USER
router.get('/:id/posts', (req, res, next) => {
    let id = req.params.id;
    console.log('userId', id)
    userDb.getUserPosts(id)
        .then(userPostData => {
            res.status(200).json(userPostData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The posts from that user could not be retrieved."
            })
        })
});

module.exports = router;