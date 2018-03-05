const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

server.use((req, res, next) => {
    next();
});

server.use(bodyParser.json());

let idCounter = 0;
let users = [];

server.post('/users', (req, res) => {
    const {name} = req.body;
    res.status(STATUS_SUCCESS);
    const usersObj = { name, id: ++idCounter };
    users.push(usersObj);
    res.send(users);
});

server.get('/users', (req, res) => {
    res.status(STATUS_SUCCESS);
    res.send(users);
});


server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`)
    }
});