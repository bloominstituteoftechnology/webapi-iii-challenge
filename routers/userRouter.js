const express = require('express');
const router = express.Router();
const users = require('../data/helpers/userDb');
//const users = require('../helpers/userDb');
//const db = require('../dbConfig');

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};


/********* Get Users *************/
router.get('/', (req, res) => {
    users.get()
        .then((userDb) => {
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
    const { id } = req.params.id;
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
router.put('/:id',/*  customMW, */(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then(response => {
            if (response === 0) {
                return sendUserError(404, 'No user by that id');
            } else {
                db.find(id).then(user => {
                    res.json(user);
                });
            }
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});



module.exports = router;