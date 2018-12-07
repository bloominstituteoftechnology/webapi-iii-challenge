const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const PORT = 4000;
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const uppercase = (req, res, next) => {
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase();
        next();
    } else
        next()
}
server.use(express.json());
server.use(helmet());
server.use(logger('dev'))
server.disable("etag");
server.use(uppercase);

server.get('/api/users', (req, res) => {
    userDB.get()
        .then(user => {
            res
                .status(200)
                .json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDB.getUserPosts(id)
        .then(user => {
            res
                .status(200)
                .json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name) {
        res.status(404)
            .json({ message: "Please provide user name." })
        return
    }
    userDB.insert(user)
        .then(obj => {
            userDB.get(obj.id)
                .then(user => {
                    res
                        .status(200)
                        .json(user);
                }).catch(err => {
                    res
                        .status(500)
                        .json({ error: "The user could not be added" })
                })
        })
})

server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    const { id } = req.params;
    userDB.update(id, user)
        .then(count => {
            if (count) {
                userDB.get(id)
                    .then(user => {
                        res
                            .status(200)
                            .json(user);
                    })
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The user could not be updated" })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let foundUser;
    userDB.get(id).then(user => {
        foundUser = user;
        userDB.remove(id)
            .then(count => {
                if (count) {
                    res
                        .status(200)
                        .json(foundUser);
                } else {
                    res
                        .status(404)
                        .json({ message: "The user with the specified ID does not exist." })
                }
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "The user could not be removed" })
            })
    }).catch(err => {
        res
            .status(500)
            .json({ error: "The post could not be found" })
    });

})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    postDB.get(id)
        .then(post => {
            res
                .status(200)
                .json(post);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
server.get('/api/posts/', (req, res) => {
    postDB.get()
        .then(post => {
            res
                .status(200)
                .json(post);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})

server.post('/api/posts/', (req, res) => {

    const post = req.body;
    if (!post) {
        res.status(404)
            .json({ message: "Please provide post text." })
        return
    }
    postDB.insert(post)
        .then(obj => {
            postDB.get(obj.id)
                .then(post => {
                    res
                        .status(200)
                        .json(post);
                }).catch(err => {
                    res
                        .status(500)
                        .json({ error: "The post could not be added : ", err })
                })
        })
})

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;
    postDB.update(id, post)
        .then(count => {
            if (count) {
                postDB.get(id)
                    .then(post => {
                        res
                            .status(200)
                            .json(post);
                    })
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The post could not be updated: ", err })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let foundPost;
    postDB.get(id).then(post => {
        foundPost = post;
        postDB.remove(id)
            .then(count => {
                if (count) {
                    res
                        .status(200)
                        .json(foundPost);
                } else {
                    res
                        .status(404)
                        .json({ message: "The user with the specified ID does not exist." })
                }
            }).catch(err => {
                res
                    .status(500)
                    .json({ error: "The user could not be removed" })
            })
    }).catch(err => {
        res
            .status(500)
            .json({ error: "The post could not be found" })
    });




})
server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});