const express = require('express');
const userDb = require('../helpers/userDb');
const router = express.Router();

// Users
router.get('/', (req, res) => {
    userDb.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
router.get('/:id', (req, res) => {
    userDb.get(Number(req.params.id))
        .then (response => {
            if (!response) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } res.status(200).json(response);
        })
        .catch (err => res.status(500).json({ error: "The users information could not be retrieved." }))
})
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: "Please provide a name for the user." })
    }
    userDb.insert({ name })
        .then(response => res.status(201).json({ name }))
        .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database" }))
})
router.delete('/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "The user has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})
router.put('/:id', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: "Please provide name for the user." })
    }
    userDb.update(req.params.id, { name })
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ name });
            }
        })
        .catch(err => res.status(500).json({ error: "The user could not be updated" }))
})
router.get('/:id/posts', (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then (response => {
            if(!response) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } res.status(200).json(response);
        }) 
        .catch (err => res.status(500).json({ error: "The users information could not be retrieved."}))
})

module.exports = router;