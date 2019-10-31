const express = require('express');
// const cors = require ('cors');


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
    user.get()
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
    })
    .catch(err=> {
        console.log('Error: ', err);
        res.status(500).json({message: 'Cannot find user.'})
    })
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
    const valUserId = req.params.id;
    if(valUserId === null){
        res.status(400).json({message: 'Please add an Id#.'})
    } else if(users.getById(valUserId)){
        next()
    } else {
        res.status(401).json({message: 'Boo. Can\'t validated.'})
    }
};

function validateUser(req, res, next) {
    const valUser = req.body;
    if (valUser === null){
        res.status(400).json({message: 'Missing user data.'})
    } else if (valUser.name === null){
        res.status(400).json({message: 'Missing user name.'})
    } else {
        res.status(200).json(valUser);
        next();
    }
};

function validatePost(req, res, next) {
    const valPost = req.body;
    if( valPost === null){
        res.status(400).json({message: 'Missing post data.'})
    } else if('text' === null){
        res.status(400).json({message: 'Missing required text field.'})
    } else {
        res.status(200).json(valPost);
        next();
    }
};

router.use(validateUserId);
router.use(validateUser);
router.use(validatePost);

module.exports = router;
