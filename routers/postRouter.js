const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js')

router.get('/', (req, res) => {
    db
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({errorMessage: "There was an error retrieving the user list"});
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(res);
    db
    .get(id)
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        res.status(500).json({error: "There was an error retrieving the user"});
    })
    
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
    .then(flag => {
        if (flag > 0) res.json(id);
        else {
            res.status(404).json({errorMessage: "That user does not exist"});
        }
    })
    .catch(error => {
        res.status(500).json({error: "There was an error deleting the user"});
    })
})

module.exports = router;