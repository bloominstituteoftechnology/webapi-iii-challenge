const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js')

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


router.post('/', (req, res) => {
    
    let user = {};
    user.tag = req.body.tag;

    if (!user.tag) {
            res.status(400).json({error: "Please include a name for the user"});
        } 
        
        else if (user.tag.length > 80) {
            res.status(400).json({error: "Maximum character count is 128 characters"});
        } 
        
        else {
            db
            .insert(user)
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                res.status(500).json({error: "There was an error adding the user"})
            })
        }
});

router.put('/:id', (req, res) => {

const { id } = req.params;
let newUser = {};
newUser.tag = req.body.tag;


if (!newUser.tag) res.status(400).json({errorMessage: "Please include a name"});

else {
db
.update(id, newUser)
.then(flag => {
    if (flag > 0) res.json(newUser);
    else {
        res.status(404).json({errorMessage: "That user does not exist"});
    }
})
.catch(error => {
    res.status(500).json({error: "There was an error updating the user"});
})
}
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