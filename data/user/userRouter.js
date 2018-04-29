const express = require('express');

const router = express.Router();

const db = require('../helpers/userDb.js');

router.get('/', (req, res) => {
    db
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});


router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    db
    .getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/', function(req, res) {
    const users = req.body;
    db
    .insert(users)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: 'No post added.'});
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
    .update(id, update)
    .then(count => {
        if (count > 0) {
            db
            .get(id)
            .then(updatedUsers => {
                res.status(200).json(updatedUsers);
            });
        }else {
            res.status(404).json({ message: 'User with that id does not exist.' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db
    .get(id)
    .then(response => {
        user = {...response[0]};
        db
        .remove(id)
        .then(response => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = router;