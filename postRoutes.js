const express = require('express');
const router = express.Router();
const postDb = require('./data/helpers/postDb');

//get -- post
router.get('/', (req, res) => {
    postDb
    .get()
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//post -- posts 
router.post('/', (req, res) => {
    const postInfo = req.body;
    console.log(postInfo);
    postDb
    .insert(postInfo)
    .then(response => {
        res.status(201).json({ postInfo })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//delete -- posts
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    postDb
    .remove(Number(id))
    .then(response => {
        res.status(200).json({ response })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

//put -- post 
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    postDb
    .update(id, post)
    .then(response => {
        res.status(200).json({ post })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

module.exports = router;