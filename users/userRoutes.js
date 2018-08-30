const express = require('express');

const dbUsers = require('../data/helpers/userDb.js')

const router = express.Router();

function uppercase (req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

router.get('', (req, res) => {
    dbUsers.get(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The User information could not be retrieved."})
        });
});

router.get('/:id', (req, res) => {
    dbUsers.get(req.params.id)
        .then(users => {
            if(users.length > 0) {
                res.status(200).json(users);                
            } else {
                res.status(400).json({ message: "The User with the specified ID could not be retrieved."})
            }
        }) 
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The User ID could not be retrieved."})
        })
})

router.post('', uppercase, (req, res) => {
    const user = req.body;
    if(!user) {
        res.status(400).json({ message: "Please provide a name for the User."})
    }
    dbUsers.insert(user)
        .then(() => {
            dbUsers.get()
            .then(user => {
                res.status(201).json(user);
            })
        })        
        .catch( err => {
            console.error('error', err);
            res.status(500).json({ error: "There was an error while saving the User to the Database."})
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    dbUsers.remove(id)
        .then(count => {
            if(count) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "No User with this ID was found."})
            }            
        }) 
        .catch(err => res.status(500).json(err));
})

router.put('/:id', uppercase, (req, res) => {
        dbUsers.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json(user)
                } else {
                    res.status(404).json({ message: "No User with this ID was found."})
                }               
            })
            .catch(err => res.status(500).json({ message: "Update Failed"}))
})

module.exports = router;