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

// GET REQUEST BY ID
router.get('/:id', (req, res) => {

    const { id } = req.params;
    usersDB.get(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
        res.status(404).json({errorMessage: `User with id ${id} does not exist`})
        }
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

// DELETE REQUEST
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    usersDB
        .remove(id)
        .then(response => {
            // console.log(response) // 1 if deleted, 0 if not deleted
            if(response) { // if no record was deleted, response is 0...0 evaluates to false
                res.json({success: `User with id ${id} was deleted successfully.`})
            } else {
                res.status(404).json({errorMessage: `User with id ${id} does not exist`})
            }  
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'There was an error while deleting the user. Please try again.'})
        })
})





module.exports = router;