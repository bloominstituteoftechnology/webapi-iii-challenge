const express = require('express');
const postDB = require('../data/helpers/postDb.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    postDB.get()
        .then(posts => {
            res.json(posts);
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    postDB.get(id)
        .then(post => {
            res.json(post)
        })
})

router.post('/', (req, res) => {
    const post = req.body;

    postDB.insert(post)
        .then(response => {
            postDB.get(response.id)
                .then(newpost => {
                    res.json(newpost);
                })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    postDB.update(id, update)
        .then(response => {
            postDB.get(id)
                .then(updatedpost => {
                    res.json(updatedpost);
                })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    postDB.get(id)
        .then(post => {
            postDB.remove(post.id)
                .then(() => {
                    res.json(post);
                })
        })
})

module.exports = router;