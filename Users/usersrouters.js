const express = require('express');
const router = express.Router();
const usersDb = require('../data/helpers/userDb');

// TODO: Stretch: Abstract out error handling
const usersDbAccessError = {"error": "There was an error accessing the users database table."};

// ~~~ GET ~~~ //
// userDB: get() -> [{obj1},...,{objN}]
router.get('/', (req, res) => {
    usersDb.get()
        .then((usersList) => {
            res.status(200).json(usersList);
        })
        .catch((err) => {
            console.error('userDb.js/get() Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// userDB: get(id) -> {obj}
router.get('/:id', (req, res) => {
    usersDb.get(req.params.id)
        .then((user) => {
            if(user !== undefined) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"error": `A user with ID ${req.params.id} doesn't exist.`});
            }
        })
        .catch((err) => {
            console.error('userDb.js/get(id) Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// userDB: getUserPosts(id) -> [{obj1},...,{objN}]
router.get('/:id/posts', (req, res) => {
    usersDb.getUserPosts(req.params.id)
        .then((userPosts) => {
            if(userPosts.length > 0) {
                res.status(200).json(userPosts);
            } else {
                res.status(404).json({"error": `A user with ID ${req.params.id} doesn't exist.`});
            }            
        })
        .catch((err) => {
            console.error('userDb.js/getUserPosts(id) Access Error:\n', err);
            res.status(500).json(usersDbAccessError);
        });
});

// ~~~ POST ~~~ //
// userDB: insert({obj}) -> {id: ##}
router.post('/', (req, res) => {
    if(req.body.name) {
        const newUserObj = {"name": req.body.name};
        usersDb.insert(newUserObj)
            .then((newId) => {
                usersDb.get(newId.id)
                    .then((newUser) => {
                        res.status(201).json(newUser);
                    })
                    .catch((err) => {
                        console.error('userDb.js/get(id) Access Error:\n', err);
                        res.status(500).json(usersDbAccessError);
                    });
            })
            .catch((err) => {
                console.error(`userDb.js/insert({"name": "value"}) Access Error:\n`, err);
                res.status(500).json(usersDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide a name value in your POST."});
    }
});

// ~~~ PUT ~~~ //
// userDB: update(id, {obj}) -> count of updated records
router.put('/:id', (req, res) => {
    if(req.body.name) {
        usersDb.get(req.params.id)
            .then((user) => {
                if(user !== undefined) {
                    const editedUser = {"name": req.body.name};
                    usersDb.update(req.params.id, editedUser)
                        .then((updateCount) => {
                            if(updateCount > 0) {
                                usersDb.get(req.params.id)
                                    .then((user) => {
                                        res.status(200).json(user);
                                    })
                                    .catch((err) => {
                                        console.error('userDb.js/get(id) Access Error:\n', err);
                                        res.status(500).json(usersDbAccessError);
                                    });
                            } else {
                                res.status(500).json({"error": "We received what appears to be valid data from you, but the DB didn't update the record for unknown reasons."});
                            }
                        })
                        .catch((err) => {
                            console.error('userDb.js/update(id, {"name": "value"}) Access Error:\n', err);
                            res.status(500).json(usersDbAccessError);
                        });
                } else {
                    res.status(404).json({"error": `A user with ID ${req.params.id} doesn't exist.`});
                }
            })
            .catch((err) => {
                console.error('userDb.js/get(id) Access Error:\n', err);
                res.status(500).json(usersDbAccessError);
            });
    } else {
        res.status(400).json({"error": "Please provide a name value in your PUT."});
    }
});

// ~~~ DELETE ~~~ //
// user: remove(id) -> # of records deleted
router.delete('/:id', (req, res) => {
    // TODO: Delete user
    // const userToDelete;
    // usersDb.get(req.params.id).then((user) => if(user !== undefined) userToDelete = user).catch((err) => error stuff);
    // Delete user as normal
});


module.exports = router;
