
const express = require('express');

const db = require('../data/helpers/userDb');

const router = express.Router();

router.post('/', (req, res, next) => {
    const userInformation = req.body;
    console.log('user information', userInformation);
    db
        .insert(userInformation)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            logErrorToDatabase(err);

            next(err);
        });
});

router.delete('/', function(req,res) {
    const {id} = req.query;
    let user;
    db 
        .remove(id)
        .then(founduser => {
            user = { ...founduser[0] };

            db.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ erroor: err});
        });
});


router.put('/:id', function(req, res) {
    const {id} = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.getUserPosts(id).then(users => {
                    res.status(200).json(users[0]);
                });
            } else {
                res.status(404).json({ msg: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    db
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db
        .getUserPosts(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });
});

module.exports = router;