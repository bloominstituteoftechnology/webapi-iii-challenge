const express = require('express');
const userDb = require('./userDb')
const router = express.Router();
const postsDb = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
    userDb
        .insert(req.body)
        .then(user => {res.status(200).json(user)})
        .catch(err => res.status(500).json({error: 'Error with post'}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const {  text } = req.params
    const post = req.body

    postsDb
        .insert(post)
            .then(post => res.status(201).json(post)
            .catch(err => res.status(500).json({error: 'error in creating post'}))
);

router.get('/', (req, res) => {
    userDb 
        .get()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({error: 'Error on GET'}))
});

router.get('/:id', validateUserId, (req, res) => {
    const { id } = req.params
    userDb  
        .getById(id)
            .then(user => {
                if (user) {
                  res.status(200).json(user)  
                } else {
                    res.status(404).json(error: 'user not found')
                }
            }) 
            .catch(err => res.status(500).json({error: 'Error from GETBYID'}))

});

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params
    userDb
        .getUserPosts(id).then(post=> {
            res.status(200).json(post)
        })
        .catch(err => res.status(500).json({error: 'error from post by id'}))
});

router.delete('/:id', validateUserId, (req, res) => {
    const {id} = req.params
    if (id){
        userDb.remove(id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({error: 'error on user delete'}))
    } else {
        res.status(404).json({error: 'user does not exist'})
    }

});

router.put('/:id', validateUserId, (req, res) => {
    const {id} = req.params
    const {name} = req.body
    if (id) {
        userDb.update(req.body)
            .then(user => {
                name
                ? res.status(201).json(user)
                : res.status(400).json({message: "please provide a name"})
            })
            .catch(err => res.status(500).json({message: 'name could not update'}))
    } else {
        res.status(404).json({error: 'user not found'})
    }

});

//custom middleware

function validateUserId(res, req, next) {
    
        const {id} = req.params
        id 
        ? (req.user = req.body)
        : res.status(400).json({message: 'invalid user ID'})

        next()
      

};

function validateUser(req, res, next) {
    const {name} = req.body
    if (req.body) {
      name
    ? next()
    : res.status(400).json({message: "missin require name field"}) 
    } else {
        res.status(400).json({message: "missing post data"})
    }
    
};

function validatePost(req, res, next) {
    const {text} = req.body
    if (req.body){
        text
        ? next()
        : res.status(400).json({message: 'missing required text field'})
    } else {
        res.status(400).json({message: 'missing post data'})
    }

};

module.exports = router;
