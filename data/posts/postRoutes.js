const express = require('express');
const postDb = require('../helpers/userDb');
const router = express.Router(); 


router.get('/posts/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.get(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

router.get('/posts-tags/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.getPostTags(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post's tags could not be retrieved."})
        })
})


router.post('/posts', (req, res) => {
    let body = req.body

    postDb.insert(body)
        .then(posts => { 
            res.status(201).json(posts.id); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be created."})
        })
})


router.put('/posts/:id', (req, res) => {
    let [id, body] = [id, req.body]

    postDb.update(id, body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated."})
        })
})

router.delete('/posts/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.remove(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be deleted."})
        })
})