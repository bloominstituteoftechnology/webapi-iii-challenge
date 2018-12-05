const express = require('express'),
    router = express.Router(),
    db = require('./data/helpers/postDb.js');

router
    .post('/create', function (req, res) {
        const {text, userId} = req.body;

        if (!text || !userId) return res.status(400).json({errorMessage: "Please provide text and userId for the post."});

        db.insert(req.body).then(posts => res.status(201).json(posts)).catch(err => res.status(500).json({error: "There was an error while saving the post to the database"}))
    })

    .get('/get', function (req, res) {
        db.get().then(posts => res.json(posts)).catch(err => res.status(500).json({error: "The posts information could not be retrieved."}))
    })

    .get('/get/:id', function (req, res) {
        db.get(req.params.id).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(posts)
        }).catch(err => res.status(500).json({error: "The post information could not be retrieved."}))
    })

    .delete('/delete/:id', function (req, res) {
        db.remove(req.params.id).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(post)
        }).catch(err => res.status(500).json({error: "The post could not be removed"}))
    })

    .put('/update/:id', function (req, res) {
        const {text, userId} = req.body;

        if (!text || !userId) return res.status(400).json({errorMessage: "Please provide text and userId for the post."});

        db.update(req.params.id, req.body).then(post => {
            if (!post) return res.status(404).json({message: "The post with the specified ID does not exist."});
            res.json(post)
        }).catch(err => res.status(500).json({error: "The post information could not be modified."}))
    });

module.exports = router;