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
    const usersObj = {name, id: ++idCounter};
    users.push(usersObj);
    res.status(STATUS_SUCCESS);
    res.send(users);
});

server.get('/users', (req, res) => {
    res.status(STATUS_SUCCESS);
    res.send(users);
});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const foundUser = users.find((user) => user.id == id);

    if (foundUser) {
        const userRemoved = {...foundUser};
        users = users.filter(user => user.id != id);
        res.status(STATUS_SUCCESS).json({userRemoved});
    } else {
        sendUserError('No user by that ID exists in the user DB', res);
    }
});


server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`)
    }
});