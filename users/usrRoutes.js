
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

router.delete('/users/:id', function (req, res) {
const id = req.params.id;
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

//<<<NEED TO WORK ON PUT, NEED TO WORK ON PUT >>>>>>>>>>>>>>>>>>>>>>>
router.put('/users/:id', function (req, res) {


    const update = req.body;
    const id = update.id;
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
            console.log('error: ',err);

            next(err);
        });
});

//Command executes with 200 OK, but hard to confirm proper execution
router.delete('/tags/:id', function (req, res) {
    console.log('inside delete tag, id:', req.params)
    const id = req.params;
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

// It works but the order is confusing
// It resolves with server error, but actually executes (updates)
router.put('/tags/:id', function (req, res) {
    const id  = req.params.id;
    const update = req.body;
    console.log('this is the tag: ', update);
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

router.delete('/posts/:id', function (req, res) {
    const  id = req.params.id;
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
    
    const update = req.body;
    const id = update.userId;
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
        .getPostTags(id)
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