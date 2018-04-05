const userRouter = require('express').Router();

const userDb = require('./data/helpers/userDb');


userRouter.get('/', (req, res) => {
    userDb.get().then(users => {
        res.json(users);
    }).catch(error => {
        res.status(500).json('{error: "The users information could not be retrieved."}');
    })
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    userDb
        .get(id)
        .then(user => {
            if(!user) {
                res.status(404).json({error: 'Your hobbit was not found.'});
                return;
            }
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

userRouter.get('/:id/posts', (req, res) => {
    const { id } = req.params;

    userDb
        .getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

userRouter.post('/', (req, res) => {
    const name = req.body.name;

    if(!name) {
        res.status(400).json('User must have a name.');
        return;
    }

    if(name.length > 128) {
        res.status(400).json({ message: 'User name is too long. Please try again.'});
        return;
    }

    userDb.insert(req.body).then(response => {
        res.json({ ...response, ...req.body});
    }).catch(error => {
        res.status(500).json(error);
    })
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    userDb
        .get(id)
        .then(response => {
            const user = response;
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
                return;
            }
        userDb
            .remove(id)
            .then(response => {
                res.json(user);
            })
            .catch(error => {
                res.status(500).json({ error: "The user could not be removed" });
            });
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    })
});

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    userDb
        .update(id, update)
        .then(count => {
            if(count > 0) {
                userDb.get(id).then(updatedUser => {
                    res.status(200).json(updatedUser);
                });
            } else {
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.'});
            }
        })
    .catch(error => {
        res.status(500).json(error);
    })
});

module.exports = userRouter;