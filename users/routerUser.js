const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb.js');

router.get("/", (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved."})
    });
})

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db
    .get(id)
    .then(user => {
        if (user === undefined) {
            res.status(400).json({ error: `User with id ${id} not found.`})
        } else {
            res.status(200).json(user);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    db
    .getUserPosts(id)
    .then(userPosts => {
        res.status(200).json(userPosts);
    })
    .catch(error => console.error(error));
})

router.post('/', (req, res) => {
    const user = req.body;
    if (user.name === undefined || user.name.length > 128) res.status(400).json({ error: "Name field is required (128 characters maximum)."})
    db
    .insert(user)
    .then(newID => {
        db
        .get(newID.id)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => res.status(500).json({ error: "Added user could not be retrieved."}));
    })
    .catch(error =>  res.status(500).json({ error: "User could not be added to database." }));
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if (user.name === undefined || user.name.length > 128) res.status(400).json({ error: "Name field is required (128 characters maximum)."})
    db
    .update(id, user)
    .then(count => {
        db.get(id).then(user => res.status(200).json(user)).catch(error => console.error(error))
    })
    .catch(error => res.status(500).json({ error: `user with id ${id} could not be updated.` }));

})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
    .then(deletions => {
        if (deletions === 1) {
            res.status(200).json({ success: `user with id ${id} was deleted.`})
        } else {
            res.status(404).json({ error: `user with id ${id} was not found.`})
        }
    })
    .catch(error => res.status(500).json({ error: `user with id ${id} could not be deleted.` }))
})

module.exports = router;