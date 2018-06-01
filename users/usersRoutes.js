const express = require('express');
const usersDB = require('../data/helpers/userDb.js');
const router = express.Router();

// GET REQUEST 
router.get('/', (req, res) => {

    usersDB.get()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.status(500).json({errorMessage: 'There was an error while retrieving the list of users.'})
    })
})


// POST REQUEST 
router.post('/', (req, res) => {

    const { name } = req.body;
    if (name.length < 1 || name.length > 128) {
        res.status(400).json({errorMessage: 'error'})
        return;
    }

    usersDB
        .insert({ name })
        .then(response => {
            res.status(201).json({ response });
            return;
    })
        .catch(error => {
        res.status(500).json({errorMessage: 'There was an error saving the user to the database'})
        return;
        });
});





module.exports = router;