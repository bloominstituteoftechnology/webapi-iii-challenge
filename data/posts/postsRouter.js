const express = require("express");
const router = express.Router();
const postDb = require("../helpers/postDb");

router.get('/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: 'posts cannot be retrieved', error: error })
        })
})

router.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.get(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'post does not exist' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'post cannot be retrieved', error: error })
        })
})

router.post('/posts/', (req, res) => {
    if (req.body.userId && req.body.text) {
        postDb.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: 'the post could not be added' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide an id and some text' });
    }
})

router.put('/posts/:id', (req, res) => {
    const id = req.params;
    if (req.body.text) {
        postDb.update(id, req.body)
            .then(count => {
                if (count === 1) {
                    res.status(200).json({ message: 'the post has been updated' });
                } else {
                    res.status(404).json({ message: 'the post does not exist' });
                }
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'the post information could not be modified', error: error });
            })
    } else {
        res.status(400).json({ message: 'please provide some text' });
    }
})
router.delete('/posts/:id', (req, res) => {
    const id = req.params.id;

    postDb.remove(id)
        .then(count => {
            if (count === 1) {
                res.status(200).json({ message: 'the post has been deleted' });
            } else {
                res.status(404).json({ message: 'the post does not exist' })
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'the post cannot be deleted', error: error })
        })
})
module.exports = router;
