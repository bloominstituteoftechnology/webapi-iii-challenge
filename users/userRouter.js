const express = require('express');

const router = express.Router();
const db = require('./userDb');
const postDb = require('../posts/postDb');


router.post('/', validateUser, (req, res) => {
    const name = req.body;
    db.insert(name)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).json({ message: "doh" })
        })
});



router.get('/', (req, res) => {
    db.get()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ message: "doh" })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    //enter 404 for invalid id
    const id = req.params.id;
    db.getById(id)
        .then((user) => {
            console.log("USERRRRRRR", user)
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({ message: "doh" })
        })
});


router.get('/:id/posts', validateUserId, (req, res) => {
    const userId = req.params.id;
    db.getUserPosts(userId)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ message: "doh" })
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ message: "doh" })
        })

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const name = req.body;
    const id = req.params.id;
    db.update(id, name)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(() => {
            res.status(500).json({ message: "doh" })
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const user_id = req.params.id;
    const text = req.body.text;
    const post = {
        "user_id": `${user_id}`,
        "text": `${text}`
    }
    console.log("POSSSTTTTT", post)
    postDb.insert(post)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(() => {

        })
});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getById(id)
        .then((user) => {
            if(user){
                next()
            } else {
                res.status(404).json({ message: "user not found" })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "why the catch?" })
        })
};

function validateUser(req, res, next) {
    let body = req.body;
    if(body && body.name){
        next();
    }else{
        res.status(404).json({ message: "please put user namme" })
    }
};

function validatePost(req, res, next) {
    const body = req.body;
    if (body && body.text){
        next()
    } else {
        res.status(404).json({ message: "please input something for post" })
    }
};

module.exports = router;
