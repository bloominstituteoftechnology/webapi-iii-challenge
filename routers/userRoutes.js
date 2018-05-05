const express = require('express');

const db = require('../data/helpers/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: err })
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(user => {
        if(user.length === 0) {
            res.status(404).json({ error: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching user with id ${id}` })
    });
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    db
    .getUserPosts(id)
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ error: `No Posts found for user with id ${id}` });
        } else {
            res.status(200).json(posts);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching posts for user with id ${id}` })
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const user = { name };
    if(!name) {
        res.status(400).json({ error: `Please provide a name for the user.`});
    } else {
        db.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error saving the user to the database.` });
        })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedUser = { name };
    if(!name) {
        res.status(400).json({ error: `Please provide a name for the user.`});
    } else {
        db.update(id, updatedUser)
        .then(count => {
            if(count === 0) {
                res.status(404).json({ error: `User with id ${id} not found.`})
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error updating the user with id ${id}` });
        })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(count => {
        if(count === 0) {
            res.status(404).json({ message: `The user with id ${id} was not found.`});
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error deleting the user with id ${id}` })
    })
})

module.exports = router;