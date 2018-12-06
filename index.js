const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');
const middleware = require('./middleware/uppercaseName');

const server = express();
const PORT = 5000;

server.use(express.json(), helmet(), logger('tiny'), middleware.uppercaseUserName);

/*
    CRUD API Endpoints for Posts data
*/
server.delete('/api/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(count => {
            if (count) {
                res.json({message: `Successfully deleted the post with ID: ${req.params.id}`})
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed"});
        })
});

server.get('/api/posts', (req, res) => {
    postDb.get()
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => {
            res.status(500).json({error: "The posts information could not be retrieved."});
        });
});

server.get('/api/posts/:id', (req, res) => {
    postDb.get(req.params.id)
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(500).json({error: "The post information could not be retrieved."});
        });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.userId && post.text) {
        postDb.insert(post)
            .then(idObject => {
                postDb.get(idObject.id)
                    .then(post => {
                        res.status(201).json(post);
                    })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the post to the database"});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'userId' and 'text' for the post."});
    }
});

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    if (post.userId && post.text) {
        postDb.update(req.params.id, post)
            .then(count => {
                if (count) {
                    postDb.get(req.params.id)
                        .then(post => {
                            res.json(post);
                        })
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The post information could not be modified."});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'userId' and 'text' for the post."});
    }
});

/*
    CRUD API Endpoints for Users data
*/
server.delete('/api/users/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
            if (count) {
                res.json({message: `Successfully deleted the user with ID: ${req.params.id}`})
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be removed"});
        })
});

server.get('/api/users', (req, res) => {
    userDb.get()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json({error: "The users information could not be retrieved."});
        });
});

server.get('/api/users/:id', (req, res) => {
    userDb.get(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({error: "The user information could not be retrieved."});
        });
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDb.insert(user)
            .then(idObject => {
                userDb.get(idObject.id)
                    .then(user => {
                        res.status(201).json(user);
                    })
            })
            .catch(err => {
                res.status(500).json({error: "There was an error while saving the user to the database"});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'name' for the user."});
    }
});

server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDb.update(req.params.id, user)
            .then(count => {
                if (count) {
                    userDb.get(req.params.id)
                        .then(user => {
                            res.json(user);
                        })
                } else {
                    res.status(404).json({message: "The user with the specified ID does not exist."});
                }
            })
            .catch(err => {
                res.status(500).json({error: "The user information could not be modified."});
            });
    } else {
        res.status(400).json({errorMessage: "Please provide 'name' for the user."});
    }
});

/*
    API Endpoint for getting posts by user
*/
server.get('/api/users/:id/posts', (req, res) => {
    console.log(req.params.id);
    userDb.get(req.params.id)
        .then((user) => {
            if (user) {
                userDb.getUserPosts(req.params.id)
                    .then((posts) => {
                        res.json(posts);
                    })
                    .catch((err) => {
                        res.status(500).json({error: `The posts information could not be retrieved for userid ${req.params.id}.`});
                    });
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."});
            }
        })
        .catch((err) => {
            res.status(500).json({error: "The user information could not be retrieved."});
        });
});

server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});