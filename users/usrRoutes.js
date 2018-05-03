
const express = require('express');

const dbU = require('../data/helpers/userDb');
const dbT = require('../data/helpers/tagDb');
const dbP = require('../data/helpers/postDb');

const router = express.Router();

router.post('/users', (req, res, next) => {
    const userInformation = req.body;
    console.log('user information', userInformation);
    dbU
        .insert(userInformation)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);

            next(err);
        });
});

router.delete('/users', function (req, res) {
    const { id } = req.query;
    let user;
    dbU
        .remove(id)
        .then(founduser => {
            user = { ...founduser[0] };

            dbU.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ erroor: err });
        });
});


router.put('/users/:id', function (req, res) {
    const { id } = req.params;
    const update = req.body;

    dbU
        .update(id, update)
        .then(count => {
            if (count > 0) {
                dbU.getUserPosts(id).then(users => {
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

router.get('/users', (req, res) => {
    dbU
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
        console.log('insdie dbU, req.params are: ', req.query);

});

router.get('/users/:id', (req, res) => {
    const id = req.params.id;

    dbU
        .getUserPosts(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});








router.post('/tags', (req, res, next) => {
    const userInformation = req.body;
    console.log('user information', userInformation);
    dbT
        .insert(userInformation)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            logErrorToDatabase(err);

            next(err);
        });
});

router.delete('/tags', function (req, res) {
    const { id } = req.query;
    let user;
    dbT
        .remove(id)
        .then(founduser => {
            user = { ...founduser[0] };

            dbT.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ erroor: err });
        });
});


router.put('/tags/:id', function (req, res) {
    const { id } = req.params;
    const update = req.body;

    dbT
        .update(id, update)
        .then(count => {
            if (count > 0) {
                dbT.getUserPosts(id).then(users => {
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

router.get('/tags', (req, res) => {
    dbT
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/tags/:id', (req, res) => {
    const id = req.params.id;

    dbT
        .getUserPosts(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});








router.post('/posts', (req, res, next) => {
    const userInformation = req.body;
    console.log('user information', userInformation);
    dbP
        .insert(userInformation)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            logErrorToDatabase(err);

            next(err);
        });
});

router.delete('/posts', function (req, res) {
    const { id } = req.query;
    let user;
    dbP
        .remove(id)
        .then(founduser => {
            user = { ...founduser[0] };

            dbP.remove(id).then(response => {
                res.status(200).json(user);
            });
        })
        .catch(err => {
            res.status(500).json({ erroor: err });
        });
});


router.put('/posts/:id', function (req, res) {
    const { id } = req.params;
    const update = req.body;

    dbP
        .update(id, update)
        .then(count => {
            if (count > 0) {
                dbP.getUserPosts(id).then(users => {
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

router.get('/posts', (req, res) => {
    dbP
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/posts/:id', (req, res) => {
    const id = req.params.id;

    dbP
        .getUserPosts(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: 'user not found' });
            } else {
                res.json(users[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;