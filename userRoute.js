const express = require('express');
const userDb = require('./data/helpers/userDb');

// Middleware
const router = express.Router();

// --------USER--------

// GET method for user
router.get('/', (req, res) => {

    userDb
    .get()
    .then(response => {
        res.status(200).json({ response });
    })
    .catch(err => {
        res.status(500).json({ Error: err });
    })
}) 

// POST method for user
router.post('/', (req, res) => {
    const userInfo = req.body;
    
    userDb
    .insert(userInfo)
    .then(response => {
        res.status(201).json({ userInfo })
    })
    .catch( err => {
        res.status(500).json({ Error: err })
    })
})

// DELETE method for user
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    let userDeleted;

    userDb
    .get(id)
    .then(user => {
        userDeleted = { ...user }
    })

    userDb
    .remove(id)
    .then(response => {
        console.log(userDeleted)
        res.status(200).json({ userDeleted })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// PUT method for user
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    userDb
    .update(id, user)
    .then(response => {
        res.status(200).json({ user })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

// Retrieve List of Post for a User
router.get('/:id', (req, res) => {
    const id = req.params.id;

    userDb
    .getUserPosts(id)
    .then(response => {
        res.send({ response })
    })
    .catch(err => {
        res.json({ Error: err })
    })
})

module.exports = router;