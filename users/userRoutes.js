const express = require('express');

const userDb = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    userDb
        .get()
        .then((response) => res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching users' }))
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .get(id)
        .then((response) => response.length === 0
            ? res.status(200).send({error: `User not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching users' }))
});

router.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    userDb
        .getUserPosts(id)
        .then((response) => response.length === 0
            ? res.status(200).send({error: `User  post(s) not found`})
            : res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching user posts' }))
});

router.post('/', (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(400).send({error: 'Please provide a name for the user'});
    }

    userDb.insert(req.body).then(user => {
        res.status(200).send(req.body)
    }).catch(err => {
        res.status(500).send({error: 'There was a error while saving to user to database'});
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    userDb.remove(id)
        .then((response) => response === 0
            ? res.status(404).send({ error: `User with id ${id} not found` })
            : res.status(200).send({ message: `User with id ${id} deleted` }))
        .catch(err => {
        }).catch(err => {
        res.status(500).send({error: 'problem'});
    })
});

router.put('/:id', (req, res) => {

    let id = req.params.id;
    let name = req.body;
    if (name && (name.name)) {
        userDb.update(id, name)
            .then((response) => response === 0
                ? res.status(404).send({ error: `User with id ${id} not found` })
                : res.status(200).send({ message: `User with id ${id} updated` }))
            .catch(() => res.status(500).send({ error: `Error updating user with id ${id}` }))
    }
});

module.exports = router;