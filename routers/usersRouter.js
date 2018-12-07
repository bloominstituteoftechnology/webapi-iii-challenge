const express = require('express');
const usersDB = require('../data/helpers/userDb.js');
const middleware = require('../customMiddleware.js');

const router = express.Router();
router.use(middleware.uppercase);


router.get('/', (req, res) => {
    usersDB.get()
        .then((users) => {
            res.json(users);
        })

        .catch(err => {
            res.status(500)
                .json({ error: "User information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    usersDB.get(id)
        .then((user) => {
            if (user) {
                res.json(user);
            }
            else {
                res.status(404)
                    .json({ message: "The user with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "User information could not be retrieved." });
        })
})

router.get('/posts/:userId', (req, res) => {
    const { userId } = req.params;
    usersDB.getUserPosts(userId)
        .then((userPosts) => {
            if (userPosts) {
                res.json(userPosts);
            }
            else {
                res.status(404)
                    .json({ message: "The user with this id does not exist." });
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "User information could not be retrieved." });
        })
})

router.post('/', middleware.uppercase, (req, res) => {
    const user = req.body;
    if (user) {
        usersDB.insert(user).then(userId => {
            usersDB.get(userId.id)
                .then(user => {
                    res.status(201).json(user);
                });
        })
            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error adding user to the database. " })
            })

    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide a name for the user." });
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    usersDB.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Removed succesfully." });
            }
            else {
                res.status(404)
                    .json({ message: "The user with the specified ID does not exist. "});
            }
        })

        .catch(err => {
            res.status(500)
                .json({ error: "The user could not be removed. "});
        })
});

router.put('/:id', middleware.uppercase, (req, res) => {
    const user = req.body;
    const { id } = req.params;
    if(user.name) {
        usersDB.update(id, user)
            .then(count => {
                if(count) {
                    usersDB.get(id)
                        .then(user => {
                            res.json(user);
                        });
                }
                else {
                    res.status(404)
                        .json({ message: "The user with the specified ID does not exist. "});
                }
            })

            .catch(err => {
                res.status(500)
                    .json({ error: "The user info could not be modified." });
            });
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide name for the user." });
    }
});

module.exports = router;