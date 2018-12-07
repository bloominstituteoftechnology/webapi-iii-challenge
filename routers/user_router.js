const express = require('express');
const router = express.Router();
const userDB = require('../data/helpers/userDb')

router.use(express.json());

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting users'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    userDB.get(id)
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({message: 'That user ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding that Users Posts'})
    })
});

router.post('/', (req, res) => {
    const user = req.body;
    
    if(user && user.name.length < 128 ) {
        console.log(user.name.length)
        userDB.insert(user)
        .then(idInfo => {
            userDB.get(idInfo)
            .then(user => {
                res.status(201).json(user)
            })
        })
        .catch(err => {
            res.status(500).json({message: 'Error creating new User'})
        })
    } else {
        res.status(500).json({message: 'No user name, or user name too long'})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    userDB.remove(id)
    .then(count => {
        if (count) {
            res.json({message: 'User Deleted'})
        } else {
            res.status(404).json({message: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error deleting user'})
    })
});

router.put('/:id', (req, res) => {
    const user = req.body;
    const {id} = req.params;

    if(user) {
        userDB.update(id, user)
        .then(count => {
            if(count) {
                userDB.get(id)
                .then(user => {
                    res.json(user)
                })
            } else {
                res.status(404).json({message: 'That user ID does not exist'})
            }
         })
        .catch(err => {
            res.status(500).json({message: 'error updating user'})
        })
    } else {
        res.status(400).json({message: 'Please provide a name'})
    }
})


module.exports = router;