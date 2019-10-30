const express = 'express';

const user = require('./userDb.js');
const post = require('../posts/postDb.js');

const router = express.Router();


//POST
router.post('/', (req, res) => {
    const newUser = req.body;
    console.log('New User:', newUser);
    if(name === null){
        res.status(400).json({error: 'Please enter a name.'})
    } else {
        user.insert(newUser)
        .then(data=>{
            res.status(201).json(data);
        })
        .catch(err=>{
            console.log('Error: ', err);
            res.status(500).json({error: 'Error adding user.'})
        })
    }
});

router.post('/:id/posts', (req, res) => {
    post.insert(req.body)
    .then(data=> {
        res.status(201).json(data)
    })
    .catch(err=> {
        console.log('Error: ', err);
        res.status(500).json({message: 'Error adding post.'})
    });
});


//GET
router.get('/', (req, res) => {
    user.find()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=> {
        console.log('Error: ', err);
        res.send(500).json({message: 'Error retrieving data.'})
    });
});

router.get('/:id', (req, res) => {
    user.getById(req.params.id)
    .then(data=> {
        res.status(200).json(data);
    });
});

router.get('/:id/posts', (req, res) => {
    user.getUserPosts(rew.params.id)
    .then(data=> {
        res.status(200).json(data);
    })
    .catch(err=> {
        console.log('Error: ', err);
        res.status(500).json({message: 'Error finding post.'})
    });
});


//DELETE
router.delete('/:id', (req, res) => {
    user.remove(req.params.id)
    .then(count=> {
        if(count > 0){
            res.status(200).json({message: `User ${req.params.id} was deleted.`})
        } else {
            res.status(404).json({message: 'User not found'})
        }
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({message: 'Error deleting user'})
    });
});


//PUT
router.put('/:id', (req, res) => {
    user.update(req.params.id, req.body)
    .then(data=> {
        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({message: 'Error updating user'})
    });
});

//CUSTOM MIDDLEWARE

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
