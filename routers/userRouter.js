const express = require('express');
const router = express.Router();
const users = require('../data/helpers/userDb');

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/********* Get Users *************/
router.get('/', (req, res) => {
    users.get()
        .then(userDb => {
            res.json(userDb);
        })
        .catch(err => {
            return sendUserError(500, 'Database Error', res);
        });
});

/************* Get Single User's Posts *************/
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    users
        .getUserPosts(id)
        .then(usersPosts => {
            if (usersPosts === 0) {
                return sendUserError(404, 'No posts by that user', res);
            }
            res.json(usersPosts);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            return sendUserError(500, 'The user information could not be found', res);
        });
});

/************* Create User *************/
router.post('/', (req, res) => {
    const { name } = req.body;
    users
        .insert({ name })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            return sendUserError(500, 'Failed to insert user in db', res);
        });
});

/************* Delete Single User *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(userRemoved => {
            if (userRemoved === 0) {
                return sendUserError(404, 'The user could not be found');
            } else {
                res.json({ success: 'User Removed' });
            }
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable...', res);
        });
});

/************* Update Single User *************/
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
        res
            .status(400)
            .json({ message: "Please provide name and id for the post." });
    } else {
        const user = users.get({ id })
        if (user) {
            users.update(id, { name })
                .then(user => {
                    if (user) {
                        users.get({ id });
                        if (user) {
                            res
                                .status(201)
                                .json(user);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The user with the specified ID does not exist." })
                        }
                    } else {
                        // nothing here
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The user could not be modified." });
                });
        } else {
            res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
        }
    }
})

module.exports = router;