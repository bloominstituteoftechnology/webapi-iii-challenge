//dependencies 

const postDb = require('./data/helpers/postDb.js');
const express = require('express');

//define router

const router = express.Router();

// respond with full array of posts

router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res
                .json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({message: `The posts' information could not be retrieved.`});
        })
})

//respond with individual post

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDb.get(id)
        .then(post => {
            if (post) {
                res
                    .json(post);
            }
            else {
                res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The post information could not be retrieved.'});
        });
});

//insert new post into post database 

router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.text && newPost.userId) {
        postDb.insert(newPost)
            .then(idInfo => {
                postDb.get(idInfo.id)
                    .then(addedPost => {
                        res
                            .status(201)
                            .json(addedPost);
                    });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'There was an error saving the new post.'})
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please provide the text for the new post.'})
    }
});

//remove post from post database

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
        .then(count => {
            if (count) {
                res.json({message: 'The post was deleted.'});
            }
            else {
                res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist.'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The post could not be removed.'});
        });
});

//update existing post

router.put('/:id', (req, res) => {
    const updatedPost = req.body;
    const { id } = req.params;
    if (updatedPost.text && updatedPost.userId) {
        postDb.update(id, updatedPost)
            .then(count => {
                if (count) {
                    res.json({message: 'The post was updated.'});
                }
                else {
                    res
                        .status(404)
                        .json({message: 'The post with the specified ID does not exist.'});
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The post information could not be updated.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: `Please provide the post's updated text and user ID.`});
    }
});

module.exports = router;