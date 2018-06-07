// Import Node Modules
const express = require('express');
const db = require('../data/helpers/tagDb');
const router = express.Router();

// GET tag // Postman test ___: http://localhost:5000/api/tags
router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts.map(post => {
            return {
                ...post, tag: post.tag.toUpperCase()
            }
        }));
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'Tag info could not be retrieved.' })
    });
});

// GET tag by id // Postman test ___: http://localhost:5000/api/tags/2
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: 'The specified Tag ID does not exist.' })
        } else {
            res.json({...posts, tag: posts.tag.toUpperCase()});
        }
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'The Tag info could not be retrieved.' })
    });
});

// POST // Postman test ___: http://localhost:5000/api/tags
router.post('/', (req, res) => {
    const { tag } = req.body;
    const newTag = { tag };
        if (tag.length === 0 || tag.length > 80) {
            res.status(404).json({ message: 'The specified Tag does not exist.' })
        } else
        db
        .insert(newTag)
        .then(post => {
            res.status(201).json(post);
        })
        // Retrieval Error From Database
        .catch(err => {
            res.status(500).json({ error: 'There was an error saving to the database.' })
        });
});

// DELETE tag // Postman test ___: http://localhost:5000/api/tags/15
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: 'The specified Tag does not exist.' })
    } else
    db
    .remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ error: 'Tag could not be removed.' })
    });
});

// PUT, update tag // Postman test ___: http://localhost:5000/api/tags/2
router.put('/:id', (req, res) => {
    const { tag } = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ msg: 'Specified Tag ID does not exist.' })
    } 
    if(tag.length === 0 || tag.length > 80) {
        res.status(400).json({ errorMsg: 'Provide Tag.' })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    // Retrieval Error From Database
    .catch(err => {
        res.status(500).json({ errorMsg: 'Tag could not be modified.' })
    });
});

// Module Export
module.exports = router;