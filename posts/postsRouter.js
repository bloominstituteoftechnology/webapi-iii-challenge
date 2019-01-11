const express = require('express');
const postsDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');
const router = express.Router();

// middleware
function checkUser (req, res, next) {
    const { userId } = req.body;

    userDb.get(userId)
        .then( user => {
            if(user){
                next();
            }
            else{
                res.status(404).json({message: `user of userId: ${userId} not found`})
            }
        })
}

function checkBody (req, res, next) {
    const {userId, text} = req.body;


    if(userId){
        if(text){
            next();
        }
        else{
            res.status(400).json({message: 'please provide a text string for the post'})
        }
    }
    else{
        res.status(400).json({message: 'please provide a userId'})
    }
}

function checkPost (req, res, next) {
    const id = req.params.id;

    postsDb.get(id)
        .then(post => {
            next();
        })
        .catch(err=> {
            res.status(404).json({message: `post of id: ${id} not found`}); 
        })
}

//routes / endpoints
router.get('/', (req, res) => {
    postsDb.get()
        .then(posts => {
            res.status(200).json({posts})
        })
        .catch(err => {
            res.status(500).json({error: 'Could not retrieve posts'})
        });
});

router.get('/:id', (req, res) => {
    postsDb.get(req.params.id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(404).json({message: `post of id: ${req.params.id} not found.`});
    })
});

router.post('/', checkBody, checkUser, (req, res) => {
    postsDb.insert(req.body)
        .then(result => {
            res.status(201).json({message: `successfully added post. New post id: ${result.id}`});
        })
        .catch(err => {
            res.status(500).json({message: 'Could not add post', error: err})
        })
});

router.put('/:id', checkBody, checkUser, checkPost, (req,res) => {
    postsDb.update(req.params.id,req.body)
        .then(count => {
            res.status(200).json({message: `post of id:  ${req.params.id} successfully updated`})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not update post', error: err});
        })
})

router.delete('/:id', checkPost, (req, res) => {
    postsDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `post of id: ${req.params.id} successfully deleted`})
        })
        .catch(err => { 
            res.status(500).json({message: 'could not remove post', error: err});
        })
});

module.exports = router;