const express = require('express');
const router = express.Router();

const userDB = require("../data/helpers/userDb");
const postDB = require('../data/helpers/postDb');

router.get("/", (req, res) => {
    postDB.get()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.status(500).json({ error: "Error getting posts" });
      });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    userDB.getUserPosts(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting posts" });
        });
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    newPost.userId = id;

    if(newPost.text === '') {
        res.status(400).json({ error: "You must include text on the post" });
    } else {
        userDB.get(id)
        .then(user => {
            if (user) {
                postDB.insert(newPost)
                    .then(idInfo => {
                        userDB.getUserPosts(id)
                            .then(posts => {
                                const post = posts.filter(post => {
                                    return post.id === idInfo.id
                                });

                                res.json(post);
                            })
                            .catch(err => {
                                res.status(500).json({ error: "Error getting posts" });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({ message: "There was an error saving the new post." });
                    });
            } else {
            res.status(404).json({ message: "User with specified ID is not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Could not get user" });
        });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    newPost.userId = id;

    if(newPost.text === '') {
        res.status(400).json({ error: "You must include text on the post" });
    } else if(newPost.id === undefined) {
        res.status(400).json({ error: "You must include an id on the post" });
    }else {
        userDB.get(id)
            .then(user => {
                if (user) {
                    postDB.update(newPost.id, newPost)
                        .then(count => {
                            if (count) {
                                userDB.getUserPosts(id)
                                    .then(posts => {
                                        const post = posts.filter(post => {
                                            return post.id === newPost.id
                                        });
        
                                        res.json(post);
                                })
                            } else {
                                res.status(404).json({ error: "Error getting posts" })
                            }
                        })
                        .catch(err => {
                            res.status(500).json({ message: "There was an error saving the new post." });
                        });
                } else {
                res.status(404).json({ message: "User with specified ID is not found" });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "Could not get user" });
            });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDB.remove(id)
      .then(count => {
          res.json({ message: "The post was deleted." });
      })
      .catch(err => {
        res.status(500).json({ message: "The post could not be removed." });
      });
});


module.exports = router;