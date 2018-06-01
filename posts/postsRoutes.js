const express = require('express');
const postsDB = require('../data/helpers/postDb.js');
const router = express.Router();


// GET REQUEST
router.get('/', (req, res) => {

    postsDB
        .get()
        .then(posts => {
            res.json(posts)
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'There was an error retrieving the posts. Please try again'})
        })
})

// GET REQUEST BY ID

router.get('/:id', (req, res) => {

    const { id } = req.params;
    postsDB
        .get(id)
        .then(post => {
            console.log(post)
            if(post) {
                res.json(post)
            } else {
                res.status(404).json({errorMessage: `Post with id ${id} does not exist.`})
                return;
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'There was an error retrieving the post.'})
        })
})



module.exports = router;