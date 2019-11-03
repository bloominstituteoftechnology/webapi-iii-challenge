const express = require('express');
const router = express.Router();
const userDb = require('./userDb')
const postDB = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
    const { user } = req.body

    userDb.insert(user)
        .then(() => {
            res.status(201).send('user created sucessfully!')
        }).catch(() => {
            res.status(500).json({
                err: 'Name has to be unique '
            })
        })
});//ADD USER

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
    const post = req.body
    postDB.insert(post)
    .then(()=>{
        res.status(201).send('post create sucessfully!')
    }).catch((err)=>{
        res.status(500).json({messege:`uh oh...${err}`})
    })
});// ADD POST from USERs ID

router.get('/', (req, res) => {
    userDb.get()
        .then(user => {
            res.json(user)
        })
});// GET USERS

router.get('/:id', validateUserId, (req, res) => {
    const user = req.user
    res.json(user)
});// GET USER by ID

router.get('/:id/posts',validateUserId, (req, res) => {
    const id = req.user.id
    userDb.getUserPosts(id).then(post=>{
        res.json(post)
    }) 
});// GET ALL POSTS from USER with ID

router.delete('/:id',validateUserId, (req, res) => {
    const id = req.user.id
    userDb.remove(id)
    .then(user=>{
        res.status(200).json({messege:`user removed sucessfully`})
    })
});// DELETE USER with ID

router.put('/:id',validateUserId, (req, res) => {
    const updatedVals = req.body
    const id = req.user.id
    userDb.update(id, updatedVals)
    .then(user=>{
        res.status(201).json(user)
    }).catch(()=>{
        res.status(500).json({message:'user could not be updated'})
    })
}); //EDIT USER with ID

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params
    userDb.getById(id)
        .then(user => {
            req.user = user
            next()
        })
        .catch(() => {
            res.status(400).json({
                messege: 'invalid user id'
            })
        })
};

function validateUser(req, res, next) {
    const user  = req.body
    if (!user) {
        res.status(400).json({ messege: 'missing user data' })
        if (!user.name) {
            res.status(400).json({ messege: 'missing name on user' })
        }
    }
    next()


};

function validatePost(req, res, next) {
    const post  = req.body
    if (!post) {
        res.status(400).json({ messege: 'missing post data' })
        if (!post.text) {
            res.status(400).json({ messege: 'missing text on user' })
        }
    }
    req.post = post
    next()
};

module.exports = router;
