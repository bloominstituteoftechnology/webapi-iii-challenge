//dependencies
const express = require('express');
const router = express.Router();
const userDb = require('../helpers/userDb');


//the middleware function
// function capitalize(req, res, next) {
//     let name = req.body.name;
//     name = name.split(" ").map(item => {
//         return item = item.substring(0, 1).toUpperCase() + item.substring(1);
//     }).join(" ");
//     req.body.name = name;
//     next();
// }
const capitalize = require('../../Middleware/capitalize');

//router endpoints
router.get('/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: 'The users information could not be retreived' })
        })
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .get(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'A user with that ID could not be found' })
            }
            res.status(200).json(user)
        })
        .catch(err => res.status(500).json({ error: 'The user information could not be retrieved.' }))
});
router.post('/', capitalize, (req, res) => {
    const userData = req.body;
    userDb
        .insert(userData)
        .then(userId => res.status(201).json({ message: 'user added' }))
        .catch(err => res.status(500).json({ message: 'there was an error adding the user' }))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(404).json({ message: 'A user with the specified ID could not be found' })
            }
            res.status(200).json(count)
        })
        .catch(err => res.status(500).json({ message: 'there was an error deleting the user' }))
})
router.put('/:id', capitalize, (req, res) => {
    const id = req.params.id;
    const userUpdate = req.body;
    if (!userUpdate) {
        res.status(404).json({ message: 'Updating a user requires a name' })
    }
    userDb
        .update(id, userUpdate)
        .then(count => {
            if (count === 0) {
                res.status(404).json({ message: 'A user with the provided ID cannot be found' })
            }
            res.status(201).json(count)
        })
        .catch(err => res.status(400).json({ message: 'could not update user' }))
})

//export the router
module.exports = router