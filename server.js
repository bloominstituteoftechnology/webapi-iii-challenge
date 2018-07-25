//imports
const express = require('express');
const morgan = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');
const tagDb = require('./data/helpers/tagDb');


//initialize server
const server = express();
server.use(express.json());
server.use(morgan('dev'));

//GET USERS
server.get('/api/users', (req, res) => {
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
server.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;
    userDb.get(userId)
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
//GET POSTS
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(postData => {
            res.status(200).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The posts could not be retrieved."
            })
        })
});
//GET TAGS
server.get('/api/tags', (req, res) => {
    tagDb.get()
        .then(postData => {
            res.status(200).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The tags could not be retrieved."
            })
        })
});
//GET POSTS FOR SPECIFIC USER
server.get('/api/users/:userId/posts/', (req, res) => {
    const userId = req.params.userId;
    userDb.getUserPosts(userId)
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
server.get('/api/users/:userId/posts/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    postDb.get(postId)
        .then(userSinglePost => {
            res.status(200).json(userSinglePost);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The tags from that post could not be retrieved."
            })
        })
});
//GET TAGS FOR SPECIFIC POST 
server.get('/api/posts/:postId/tags/', (req, res) => {
    // const userId = req.params.userId;
    const postId = req.params.postId;
    postDb.getPostTags(postId)
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

//NEW USER
server.post('/api/users', (req, res) => {

    const name = req.body.name;
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
                "failed": "new post was not created",
                "error": err
            })
        })
})

//NEW POST
server.post('/api/posts', (req, res) => {

    const userId = req.body.userId;
    const text = req.body.text;
    let newPost = {
        userId,
        text
    };
    postDb.insert(newPost)
        .then(response => {
            res.status(200).json({
                "success": "new post created",
                "post": newPost,
                "response": response
            })
        })
        .catch(err => {
            res.status(500).json({
                "failed": "new post was not created",
                "error": err
            })
        })
})

//NEW TAG
server.post('/api/tags', (req, res) => {
    const tag = req.body.tag;
    let newTag = {
        tag
    };
    tagDb.insert(newTag)
        .then(response => {
            res.status(200).json({
                "success": "new tag created",
                "tag": newTag,
                "new_tag_id": response
            })
        })
        .catch(err => {
            res.status(500).json({
                "failed": "new tag was not created",
                "error": err
            })
        })
})
//UPDATE USER
server.put('/api/users', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    // let updateUser = {
    //     id,
    //     name
    // };
    userDb.update(id, name)
        .then(response => {
            res.status(200).json({
                "success": "new user created",
                "post": newUser,
                "new_user_id": response
            })
        })
        .catch(err => {
            res.status(500).json({
                "failed": "user was not updated",
                "error": err
            })
        })
})

//UPDATE POST
//UPDATE TAGS

//DELETE USER
//DELETE POST
//DELETE TAGS

server.listen(8000, () => console.log('\n ====API RUNNING===\n'))