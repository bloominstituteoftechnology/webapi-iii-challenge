const express = require('express');

const userDb = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be found." });
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .get(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be found." });
        });
})

router.get('/:id/posts', (req, res) => {
    const id = req.params.id;
    userDb
        .getUserPosts(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be found." });
        })
})

router.post('/', (req, res) => {
    const name = req.body;
    userDb
        .insert(name)
        .then(named => {
            res.json(named);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user information could not be created." });
        });
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userDb
       .remove(id)
       .then(users => {
           res.json(users);
       })
       .catch(err => { 
        res.status(500).json({ error: "The user could not be removed." });
    });
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body;
    userDb
        .update( id, req.body )
        .then(users => {
            res.json(users);
        })
        .catch(err => { 
            res.status(500).json({ error: "The user could not be updated." });
        });
})

module.exports = router;