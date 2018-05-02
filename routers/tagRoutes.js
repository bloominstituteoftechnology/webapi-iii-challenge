const express = require('express');

const db = require('../data/helpers/tagDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(tags => {
        res.status(200).json(tags);
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching tags` })
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(tag => {
        if(tag.length === 0) {
            res.status(404).json({ error: `Tag with id ${id} not found` });
        } else {
            res.status(200).json(tag);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching tag with id ${id}` })
    });
});

router.post('/', (req, res) => {
    const tag = req.body;
    if(!tag) {
        res.status(400).json({ error: `Please provide a tag.`});
    } else {
        db.insert(tag)
        .then(tag => {
            res.status(201).json(tag);
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error saving the tag. Ensure it is not a duplicate.` });
        })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    const updatedTag = { tag };
    if(!tag) {
        res.status(400).json({ error: `Please provide a tag.`});
    } else {
        db.update(id, updatedTag)
        .then(count => {
            if(count === 0) {
                res.status(404).json({ error: `Tag with id ${id} not found.`})
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error updating the tag with id ${id}` });
        })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(count => {
        if(count === 0) {
            res.status(404).json({ message: `The tag with id ${id} was not found.`});
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error deleting the tag with id ${id}` })
    })
})

module.exports = router;