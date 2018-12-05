const express = require('express'),
    router = express.Router(),
    db = require('./data/helpers/userDb.js');

router
    .post('/create', function (req, res) {
        const {name} = req.body;

        if (!name) return res.status(400).json({errorMessage: "Please provide a name for the user."});

        db.insert(req.body).then(users => res.status(201).json(users)).catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
    })

    .get('/get', function (req, res) {
        db.get().then(users => res.json(users)).catch(err => res.status(500).json({error: "The users information could not be retrieved."}))
    })

    .get('/get/:id', function (req, res) {
        db.get(req.params.id).then(user => {
            if (!user) return res.status(404).json({message: "The user with the specified ID does not exist."});
            res.json(users)
        }).catch(err => res.status(500).json({error: "The user information could not be retrieved."}))
    })

    .delete('/delete/:id', function (req, res) {
        db.remove(req.params.id).then(user => {
            if (!user) return res.status(404).json({message: "The user with the specified ID does not exist."});
            res.json(user)
        }).catch(err => res.status(500).json({error: "The user could not be removed"}))
    })

    .put('/update/:id', function (req, res) {
        const {title, contents} = req.body;

        if (!name) return res.status(400).json({errorMessage: "Please provide a name for the user."});

        db.update(req.params.id, req.body).then(user => {
            if (!user) return res.status(404).json({message: "The user with the specified ID does not exist."});
            res.json(user)
        }).catch(err => res.status(500).json({error: "The user information could not be modified."}))
    });

module.exports = router;