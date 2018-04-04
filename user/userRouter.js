const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const tagDb = require('../data/helpers/tagDb.js');



// router.get('/search', (req, res) => {
//     const { id } = req.query

//     db
//     .findbyId(id)
//     .then(user => {
//         if(user.length === 0){
//             res.status(404).json({error: 'That user does not exist.'})
//         }
//         else{
//         res.json(user[0]);
//         }
//     })
//     .catch(error => {
//         res.status(500).json({error: 'User information could not be retrieved.'})
//     })
// })

router.get('/', function(req, res) {

    userDb
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({error: 'Users not found'})
    })


})

router.get('/api/users/posts', function(req, res) {
    postDb
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error: 'Posts dont exist.'})
    })
})

router.get('/api/:userId', function(req, res) {
    const {userId} = req.params
    userDb
    .get(userId)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json({error: 'User dont exist.'})
    })


})

router.get('/api/:userId/posts', function(req, res) {
    const {userId} = req.params

    userDb
    .getUserPosts(userId)
    .then(post => {
        res.status(200).json(post);
    }) 
    .catch(error => {
        res.status(500).json({error: 'That user has no legs :(.'})
    })

})

    
router.get('/api/:userId/:postId', function(req, res) {
const {userId} = req.params;
const {postId} = req.params;

    userDb
    .getUserPosts(userId)
    .then(post => {
        postDb
        .get(postId)
        .then(userPost => {
        res.status(200).json(userPost);
        })
        
    })
    .catch(error => {
        res.status(500).json({error: 'That users legs have no legs :(:('})
    })
});

router.get('/api/:userId/:postId/:tagId', function(req, res) {
    const {userId} = req.params;
    const {postId} = req.params;
    const {tagId} = req.params;

    userDb
    .getUserPosts(userId)
    .then(post => {
        postDb
        .get(postId)
        .then(userPost => {
        tagDb
        .get(tagId)
        .then(postTag => {
            res.status(200).json(postTag)
        })

        })
    .catch(error =>{
        res.status(500).json({error: 'Go deeper down the rabbit hole.'})
    })    
    })
})



// server.get('api/users/search/posts', (req, res) => {
//     const { p } = req.body;
// })

module.exports = router;
