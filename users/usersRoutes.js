const express = require('express');
const usersDB = require('../data/helpers/userDb.js');
const router = express.Router();

// GET REQUEST 
router.get('/', (req, res) => {

    usersDB.get()
    .then(users => {
        // console.log(users)
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
        console.log(user)
        if(user) {
            res.json(user)
        } else {
        res.status(404).json({errorMessage: `User with id ${id} does not exist`})
        }
    })
    .catch(error => {
        res.status(500).json({errorMessage: 'There was an error while retrieving the user.'})
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
        res.status(500).json({errorMessage: 'There was an error saving the user to the database. This could be because the name already exists, please try again with a different name.'})
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

// PUT REQUEST
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if(!name || name.length === 0) {
        res.status(400).json({errorMessage: 'Please provide the name you would like to update. '})
    }

    // IF UPDATED USER NAME ALREADY EXISTS THEN IT GOES STRAIGHT TO CATCH...will resolve later
    // usersDB.get()
    // .then(users => {
    //     if (users.includes(name))
    //         {res.status(400).json({errorMessage: 'User with that name already exists in the database. Please choose a different name'})} return;});

    usersDB
        .update(id, {name})
        
        .then(response => {
            console.log(response)
            if(response === 1) {
                usersDB.get(id)
                    .then(response => {
                        res.json(response)
                        return;
                    })
                    .catch(error => {
                        res.status(400).json({errorMessage: 'There was an error while retrieving the updated user info.'})
                        return;
                    })
            } else {
                res.status(400).json({errorMessage: 'User info was not updated. Please try again.'})
            }
        })
        .catch(error => {
            res.status(500).json({errorMessage: 'The user could not be updated. This could be because the updated name already exists in the database. Please try again with a different name.'})
        })
})



module.exports = router;