const express = require('express');
const router = express.Router();
const userDb = require('../helpers/userDb');

// all users
router.get('/', (req, res) => {
    userDb
    .get()
    .then(users => {
        res
        .status(200)
        .json(users);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});


// user by id
router.get('/:id', (req, res) => {
    userDb
    .get(req.params.id)
    .then(user => {
        if (!user) {
            res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(user);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});


//Insert User
router.post('/', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({errorMessage: "Please provide name for the user."})
        return;
    }
    userDb
        .insert({
            name
        })
        .then(response => {
            res.status(201).json({name});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the user to the database" })
        })
});


//Update User
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!name) {
        res.status(404).json({errorMessage: "Please provide name for the user."})
    }
    userDb
    .update(id, {name})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
            return;
        }
        res.status(200).json({name})
    })
    .catch(error => {
        res.status(500).json({error: "The user information could not be modified."})
        return;
    });
});


// //Delete User
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    userDb
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The user with the specified ID does not exist."})
        }
        res
        .json({message:'User removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The user could not be removed"})
        })
});


//Get user Posts
router.get('/:id/posts', (req, res) => {
    userDb
    .getUserPosts(req.params.id)
    .then(posts => {
        if (posts.length === 0) {
            res
            .status(404)
            .json({ message: "There are no posts" });
        
        }
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user post information could not be retrieved."});
});
});

module.exports = router;