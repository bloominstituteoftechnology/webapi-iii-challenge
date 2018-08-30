const express = require('express');

const dbPosts = require('../data/helpers/postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
    dbPosts.get(req.params.id)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
    dbPosts.get(req.params.id)
        .then(posts => {
            if(posts.length > 0) {
                res.status(200).json(posts);
            } else {
                res.status(400).json({ message: "The post with the specified ID could not be retrieved." })
            }
        })
        .catch(err => {
            console.error('error', err)
            res.status(500).json({ error: "The post ID could not be retrieved."})
        })
})

router.post('/', (req, res) => {
    const post = req.body;
    if(!post) {
        res.status(400).json({ message: "Please provide content for the post."})
    }
    dbPosts.insert(post)
        .then(() => {
            dbPosts.get()
            .then(post => {
                res.status(201).json(post);
            })
        })
        .catch( err => {
            console.error('error', err);
            res.status(500).json({ error: "There was an error while saving the post to the Database."})
        });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    dbPosts.remove(id)
        .then(count => {
            if(count) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "No post with this ID was found."})
            }
        })
        .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    dbPosts.update(req.params.id, req.body)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "No post with this ID was found."})
            }
        })
        .catch(err => res.status(500).json({ message: "Update Failed"}))
})

module.exports = router;