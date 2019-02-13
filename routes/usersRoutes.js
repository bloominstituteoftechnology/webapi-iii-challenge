const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');


// ============  GET endpoints

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
});


router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.getById(userId)
        .then(user => {
            if (user) {res.status(200).json(user)}
            else {res.status(404).json({message: "The user with the specified ID does not exist."})}
        })
        .catch(() => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;
    db.getUserPosts(userId)
        .then(userPosts => {
            if (userPosts) {res.status(200).json(userPosts)}
            else {res.status(404).json({message: "the user with the specified ID has no posts."})}
        })
        .catch(() => {
            res.status(500).json({error: "The user posts could not be retrieved."})
        })

});


// ============  POST endpoint

router.post('/', (req, res) => {
    const user = req.body;
    if (!req.body.hasOwnProperty('name')) {
        res.status(400).json({errorMessage: "Please provide a name property for the user."})
    }
    else {
        db.insert(user)
            .then(() => {res.status(201).json(user)})
            .catch(() => {res.status(500).json({error: "There was an error while saving the user to the database"})})
    }
});


// ============  DELETE endpoint

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    db.getById(userId)
        .then(user => {
            db.remove(userId)
                .then(deletion => {
                    if (!deletion) {
                        res.status(404).json({ message: "The user with the specified ID does not exist."})
                    }
                    else {
                        res.status(200).json({user})
                    }
                })
                .catch(() => {
                    res.status(500).json({error: "The user could not be removed"})
                })
        })
        .catch(() => {
            res.status(500).json({error: "workaround didn't work"})
        })
});

// ============  PUT endpoint

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const userUpdate = req.body;

    db.update(id, userUpdate)
        .then(userMatch => {
            if (!userMatch) {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
            else if (!userUpdate.name) {
                res.status(400).json({ errorMessage: "Please provide an updated name for the user." })
            }
            else {
                res.status(200).json(userUpdate)
            }
        })
        .catch(() => {
            res.status(500).json({error: "The user information could not be modified."})
        })
});

module.exports = router;