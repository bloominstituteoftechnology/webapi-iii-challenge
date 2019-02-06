const express = require('express');
const tagDB = require('../data/helpers/tagDb.js');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    tagDB.get()
        .then(tags => {
            res.json(tags);
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    tagDB.get(id)
        .then(tag => {
            res.json(tag)
        })
})

router.post('/', (req, res) => {
    const tag = req.body;

    tagDB.insert(tag)
        .then(response => {
            tagDB.get(response.id)
                .then(newTag => {
                    res.json(newTag);
                })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    tagDB.update(id, update)
        .then(response => {
            tagDB.get(id)
                .then(updatedTag => {
                    res.json(updatedTag);
                })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tagDB.get(id)
        .then(user => {
            tagDB.remove(user.id)
                .then(() => {
                    res.json(user);
                })
        })
})

module.exports = router;