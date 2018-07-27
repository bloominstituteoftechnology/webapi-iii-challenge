const express = require('express');
const router = express.Router();
const userDb = require('../../data/helpers/userDb');
const postDb = require('../../data/helpers/postDb');


//GET USERS
router.get('/', (req, res, next) => {
    userDb.get()
        .then(userData => {
            res.status(200).json(userData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The users could not be retrieved."
            })
        })
});
//GET SPECIFIC USER
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    userDb.get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The specific user could not be retrieved."
            })
        })
});

//GET POSTS FOR SPECIFIC USER
router.get('/:id/posts', (req, res, next) => {
    let id = req.params.id;
    console.log('userId', id)
    userDb.getUserPosts(id)
        .then(userPostData => {
            res.status(200).json(userPostData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The posts from that user could not be retrieved."
            })
        })
});

//GET SPECIFIC USER, SPECIFIC POST
router.get('/:id/posts/:postId', (req, res) => {

    const postId = req.params.postId;
    postDb.get(postId)
        .then(userSinglePost => {
            res.status(200).json(userSinglePost);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The post could not be retrieved."
            })
        })
});

//POST NEW USER
router.post('/', (req, res) => {

    let name = req.body.name;
    let newUser = {
        name
    };
    userDb.insert(newUser)
        .then(response => {
            res.status(200).json({
                "success": "new user created",
                "post": newUser,
                "new_user_id": response
            })
        })
        .catch(err => {
            res.status(500).json({
                "failed": "new user was not created",
                "error": err
            })
        })
})

//UPDATE USER
router.put('/:id', (req, res) => {

    let id = req.params.id;
    let name = req.body.name;

    userDb.update(id, {"name": name}) //?
        .then(response => {

            res.send(name + ' was updated')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "failed": "user was not updated",
                "error": err
            })
        })
})

//DELETE USER
router.delete('/:id', (req, res) => {

    let id = req.params.id;
    userDb.remove(id) //?
        .then(response => {

            res.send('user '+ id + ' was removed.')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "failed": "user was not removed",
                "error": err
            })
        })
})

module.exports = router;