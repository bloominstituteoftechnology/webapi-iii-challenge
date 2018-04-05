const express = require('express');

const db = require('../data/helpers/userDb.js');

const router = express.Router();


router.get('/', (req, res) => {
    db
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(404).json({
                error: "Users could not be found"
            })
        })
})

router.get('/:id', (req, res ) => {
    const { id } = req.params;
    db
        .getUserPosts(id)
        .then(user => {
            res.json(user[0]);
        })
        .catch(error => {
            res.status(404).json({ 
                message: "The post with the specified ID does not exist." })
        })
});

router.post('/', (req, res) => {
    const user = req.body;
    db
        .insert(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json
            ({ error: 'There was an error while saving the user to the database.' })
        })
})

router.delete('/:id', (req, res ) => {
    const { id } = req.params;
    let post;

    db
        .getUserPosts(id)
        .then(response => {
            user = {...response[0] };

        db
        .remove(id)
        .then(response => {
            res.status(500).json(user);
            })
        })
        .catch(error => {
            res.status(500).json({ 
                message: "The user could not be removed" })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.getUserPosts(id).then(updateUsers => {
                    res.status(200).json(updateUsers[0]);
                })
            } else {
                res.status(400).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;