const express = require('express');
const userDb = require('../data/helpers/userDb.js');
const router = express.Router();


// middleware
function checkUser(req,res,next) {
    userDb.get(req.params.id)
        .then(user => {
            if(user){
                next();
            }
            else{
                res.status(404).json({message: `user of id: ${req.params.id} not found.`})
            }
        })
}

function upperCheck(req,res,next) {
    let name = req.body.name;

    if(name){
        req.body.name = name.toLowerCase().split(' ').map(str => str.charAt(0).toUpperCase() + str.substring(1)).join(' ');
        next();
    }
    else{
        res.status(400).json({message: 'Please provide a name for the user.'})
    }
}

//routes / endpoints
router.get('/', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({error: 'Could not retrieve users'})
        });
});

router.get('/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => {
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({message: `user of id: ${req.params.id} not found.`})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'could not retrieve user', error: err});
    })
});

router.get('/:id/posts', checkUser, (req,res) => {
    userDb.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({message: `error retrieving posts of user ${req.params.id}`})
        })
})

router.post('/', upperCheck, (req, res) => {
    userDb.insert(req.body)
        .then(result => {
            res.status(201).json({message: `successfully added user. New user id: ${result.id}`});
        })
        .catch(err => {
            res.status(500).json({message: 'Could not add user', error: err})
        })
});

router.put('/:id', upperCheck, checkUser, (req,res) => {
    userDb.update(req.params.id,req.body)
        .then(count => {
            res.status(200).json({message: `user of id:  ${req.params.id} successfully updated`})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not update user', error: err});
        })
})

router.delete('/:id', checkUser, (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `user of id: ${req.params.id} successfully deleted`})
        })
        .catch(err => { 
            res.status(500).json({message: 'could not remove user', error: err});
        })
});

module.exports = router;