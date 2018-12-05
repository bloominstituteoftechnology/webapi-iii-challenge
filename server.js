const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const PORT = 4000;
const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');
const uppercase = (req, res, next) => {
    if (req.body.name){
    req.body.name = req.body.name.toUpperCase();
    next();
    }else
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
    userDB.insert(user)
        .then(obj => { console.log(obj.id)
            if (obj && user) {
                userDB.get(obj.id)
                    .then(user => {
                        res
                            .status(200)
                            .json(user);
                    }).catch(err => {
                        res
                            .status(500)
                            .json({ error: "There was an error while saving the user to the database" })
                    })
            } else {
                res
                    .status(404)
                    .json({ message: "Please provide user name." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The user could not be added" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const user = req.body;
    const { id } = req.params;
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
            res
                .status(500)
                .json({ error: "The user could not be updated" })
        })
})


server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});