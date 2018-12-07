const express = require('express');
const userDb = require('./data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    userDb.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users' })
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params;

    userDb.get(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'The user with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load user' })
        })
})

router.get('/:id/posts', (req, res) => {

    const { id } = req.params;

    userDb.getUserPosts(id)
        .then(userPosts => {
            if (userPosts) {
                res.json(userPosts)
            } else {
                res.status(404).json({ message: 'User with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users posts' })
        })
})

router.post('/', (req, res) => {

    const user = req.body;

    if (user.name) {
        userDb.insert(user)
            .then(idInfo => {
                userDb.get(idInfo.id).then(user => {
                    res.status(201).json(user)
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to insert user' })
            })
    } else {
        res.status(400).json({
            message: 'missing name'
        })
    }
})

router.delete('/:id', (req, res) => {

    const { id } = req.params;
    const user = req.body;

    userDb.remove(id)
        .then(count => {
            if (count) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'The user with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user' })
        })
})

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const user = req.body;

    if (user.name) {
        userDb.update(id, user)
            .then(user => {
                if (id) {
                    res.json({ message: 'User has been updated' })
                } else {
                    res.status(404).json({ message: 'The user with the specified ID does not exist' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update user' })
            })
    } else {
        res.status(400).json({ messgae: 'missing name' })
    }
})

module.exports = router;