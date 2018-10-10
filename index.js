const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const usersDb = require('./data/helpers/userDb.js');
const port = 7000;

const server = express();
server.use(logger);

const upper = (req, res, next) => {
    const newName = req.params.name.toUpperCase();
    req.name = newName;
    next();
}

server.get('/', (req, res) => {
    res.send("New Blog!");
})

server.get('/api/users', (req, res) => {
    usersDb.get()
    .then(users => {
        console.log(req.params);
        res.status(200).json(users);
    })
    .catch(err => res.send(err));
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    usersDb.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.send(err));
})

server.post('/api/users', upper, (req, res) => {
    const newUser = req.body.name;
    usersDb.insert(newUser)
    .then(id => {
        usersDb.get(id).then(user => {
            res.status(201).json(user);
        })
    })
    .catch(err => res.send(err));
})

















server.listen(port, () => {
    console.log(`Server started! Running on port ${port}. `);
})