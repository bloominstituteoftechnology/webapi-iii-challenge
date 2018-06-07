const express = require('express');
const userDb = require('../data/helpers/userDb');

const router = express.Router();

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// POST METHOD

router.post('/', (req, res) => {
    const { name } = req.body;
    if (name.length < 1 || name.length < 128) {
        userError(400, "name should be between 1-128", res);
        return;
    }
    userDb
        .insert({ name })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            userError(500, "Something is wrong", res);
        })
});

// GET METHOD

router.get('/', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            userError(500, 'Somethings wrong', res);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    userDb
        .get(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                userError(404, `User id ${id} cannot be found`)
            }
        })
})
    .catch(error => {
        userError(500, 'Somethings wrong', res);
    });

router.get('/userposts/:id', (req, res) => {
    const { id } = req.params;

    userDb
        .get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id)
                .then(userPosts=> {
                    if(userPosts.length === 0) {
                        userError(404, "The user post could not be found")
                        return;
                    }
                })
            } else {
                res.json(userPosts)
            }
        })
        .catch(error => {
            userError(404, "user not found", res);
        });
});

// DELETE METHOD

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb
        .get(id)
        .then(user => {
            userDb
                .remove(id)
                .then(result => {
                    if (result) {
                        res.json(user)
                    } else {
                        userError(404, 'User doesnt exist', res);
                    }
                })
                .catch(error => {
                    userError(500, "Somethings wrong", res)
                })
        })
})

// PUT METHOD

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if (!update.name || update.name.length === 0) {
        userError(400, "invalid username", res)
        return;
    } else {
        userDb
            .update(id, update)
            .then(result => {
                if (result === 0) {
                    sendError(404, "Invalid", res);
                    return;
                } else {
                    res.json(udpate);
                }
            })
            .catch(error => {
                userError(500, "somethings wrong", res)
            });
    };
});


module.exports = router;