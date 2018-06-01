const express = require('express');
const postsDB = require('../data/helpers/postDb.js');
const router = express.Router();


// GET REQUEST
router.get('/', (req, res) => {
    
    postsDB.get()
    .then(posts => {
        res.json(posts)
    })
    .catch(error => {
        res.status(500).json({errorMessage: 'There was an error retrieving the posts. Please try again'})
    })
})



module.exports = router;