const express = require('express');

const db1 = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db1
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(404).json({
                error: "Posts could not be found"
            })
        })
})

router.get('/:id', (req, res ) => {
    const { id } = req.params;
    db
        .getUserPosts(id)
        .then(user => {
            res.json(user[0]);
        })
        .catch(error => {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." })
        })
});


module.exports = router;