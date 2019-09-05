const express = require('express');

const router = express.Router();
const postDb = require('../posts/postDb')

router.post('/', (req, res) => {
const post = req.body
postDb.insert(post)
.then(response =>{
    res.status(201).json(response)
})
.catch(error => {
    res.status(500).json({ message: 'error adding to posts'})
})

});
    
router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;