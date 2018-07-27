const express = require('express');
const router = express.Router();
const postDb = require('../../data/helpers/postDb');

router.get('/', (req, res, next) => {
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

//NEW POST
router.post('/', (req, res) => {

    let userId = req.body.userId;
    let text = req.body.text;
    let newPost = {
        userId,
        text
    };
    postDb.insert(newPost)
        .then(response => {
            res.status(200).json({
                "success": "new post created"
            })
        })
        .catch(err => {
            new Error(err);
            res.status(500).json({
                "failed": "new post was not created",
                "error": err
            })
        })
});

//GET POST TAGS
router.get('/:id/tags', (req, res) => {
  
    let id = req.params.id;
    postDb.getPostTags(id)
        .then(userPostData => {
            res.status(200).json(userPostData);
        })
        .catch(err => {
            res.status(500).json({
                "error": err,
                "message": "The post tags could not be retrieved."
            })
        })
});

//UPDATE TAG
router.put('/:postId', (req, res) => {

    let postId = req.params.postId;
    let userId = req.body.userId;
    let text = req.body.text;

    postDb.update(postId, {
            "text": text,
            "userId": userId
        }) //?
        .then(response => {

            res.send(text + ' was updated')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "failed": "user was not updated",
                "error": err
            })
        })
})




module.exports = router;