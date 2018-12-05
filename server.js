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
        console.log(user, id)
        userDB.update(id, user)
            .then(count => {
                console.log(count)
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
                console.log(err)
                res
                    .status(500)
                    .json({ error: "The user could not be updated" })
            })
    })

    server.delete('/api/users/:id', (req, res) => {
        const { id } = req.params;
        let foundUser;
        userDB.get(id).then(user => { foundUser = user });
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
    })
    server.listen(PORT, err => {
        if (err) console.log(err);
        console.log(`server is listening on port ${PORT}`);
    });