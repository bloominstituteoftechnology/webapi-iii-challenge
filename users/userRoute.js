const express = require("express");
const db = require('../data/helpers/userDb');
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The user with the specified ID does not exist.'})
        } else {
            res.json(posts);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    });
});

router.get('/:id/users', (req, res) => {
    const id = req.params.id;
    db
    .getUserPosts(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({  message: 'The user with the specified ID does not exist.'})
        } else {
            res.json(posts);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved.'})
    });
});



router.post('/', (req, res) => {
    const {name} = req.body;
    const newPost = {name};
        if (name.length === 0 || name.length > 128) {
            res.status(404).json({ message: "The user with the specified userID does not exist."})
        } else 
        db
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error saving the user to the database."})
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ error: "user could not be removed."})
    });
});

router.put('/:id', (req, res) => {
    const {name} = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    if (name.length === 0 || name.length > 128) {
        res.status(400).json({ errorMessage: "Please provide text and userId for the user." })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    .catch(err => {
        res.status(500).json({  error: "The user information could not be modified." })
    });
});



module.exports = router;