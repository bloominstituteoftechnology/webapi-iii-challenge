const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js')

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

    db
        .get(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({errorMessage: "There was an error retrieving the user"});
        })
})

router.post('/', (req, res) => {
    
    const { name } = req.body;

    if (!name) {
            res.status(400).json({error: "Please include a name for the user"});
        } 
        
        else if (name.length > 128) {
            res.status(400).json({error: "Maximum character count is 128 characters"});
        } 
        
        else {
            
            db
            .insert(name)
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                res.status(500).json({error: "There was an error adding the user"})
            })
        }
});


module.exports = router;