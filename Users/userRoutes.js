const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb');

// ======================= ERROR HELPER ========================

const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};

// ===================== CUSTOM MIDDLEWARE =====================

const upperCase = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();
}

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        errorHelper(404, 'Name must be included', res);
        next();
    } else {
        next();
    }
};

// ROUTES
router.get('/', (req, res) => {
    res.status(200).send('Hello from root!')
});

// ===================== USER ENDPOINTS =====================

router.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.get('/api/users/:id', upperCase, (req, res) => {
    const { id } = req.params;
    userDb
        .get(id)
        .then(user => {
            if (user === 0) {
                return errorHelper(404, 'User with that id not found', res);
            }
            res.status(200).json(user);
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.post('/api/users', validateName, upperCase, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    userDb
        .insert (newUser)
        .then(userId => {
            const { id } = userId;
            userDb
                .get(id)
                .then(user => {
                    if (!user) {
                    res
                        .status(400)
                        .json({ errorMessage: 'User with that id not found' });
                }
                res.status(200).json(user);
            })
            .catch(err => {
                return errorHelper(500, 'Database error', res);
            });
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

router.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb
        .remove(id)
        .then(deletedUser => {
            if(deletedUser === 0) {
                return errorHelper(404, 'User with that id not found');
            } else {
                res.status(201).json({ success: 'User deleted' });
            }
        })
        .catch(err => {
            return errorHelper(500, 'The user could not be removed', res );
        });
   
});

router.put('api/users/:id', validateName, upperCase, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userDb
        .update(id, { name })
        .then(response => {
            if (response === 0) {
                return errorHelper(404, `The user with the specified ID: ${id} does not exist.`)
            } else {
                userDb
                    .find(id)
                    .then(user => {
                        res.json(user);
                    })
                    .catch(err => {
                        return errorHelper(500, 'Database error', res);
                    });
            }
        })
        .catch(err => {
            return errorHelper(500, 'Database error', res);
        });
});

module.exports = router;