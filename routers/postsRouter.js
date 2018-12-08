const express = require('express');
const postsDB = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    postsDB.get()
        .then((posts) => {
            res.json(posts);
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Post information could not be retrieved. " });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postsDB.get(id)
        .then((post) => {
            if (post) {
                res.json(post);
            }
            else {
                res.status(404)
                    .json({ message: "The post with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "Post information could not be retrieved." });
        })
})

router.post('/', (req, res) => {
    const { userId, text } = req.body;
    postsDB.insert({ userId, text }).then(post => {
        res.json(post);
    })

        .catch(err => {
            res.status(500)
                .json({ error: "There was an error adding user to the database. " })
        });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postsDB.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Removed succesfully." });
            }
            else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist. " });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "The post could not be removed. " });
        })
});

router.put('/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    if (post.text) {
        postsDB.update(id, post)
            .then(count => {
                if (count) {
                    postsDB.get(id)
                        .then(post => {
                            res.json(post);
                        });
                }
                else {
                    res.status(404)
                        .json({ message: "The post with the specified ID does not exist. " });
                }
            })

            .catch(err => {
                res.status(500)
                    .json({ error: "The post info could not be modified." });
            });
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide text for the post." });
    }
});

module.exports = router;