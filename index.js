const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const usersDb = require('./data/helpers/userDb.js');
const port = 7000;

const server = express();

server.get('/', (req, res) => {
    res.send("New Blog!");
})

server.get('/api/users', (req, res) => {
    usersDb.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => res.send(err));
})
















server.listen(port, () => {
    console.log(`Server started! Running on port ${port}. `);
})