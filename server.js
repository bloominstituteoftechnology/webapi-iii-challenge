const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.use(bodyParser.json());

const users = {};
let id = 0;

server.get('/users', (req, res) => {
    if (id === 0) {
        res.status(STATUS_USER_ERROR);
        res.send({ error: 'No users added yet.'});
        return;
    }

    res.status(STATUS_SUCCESS);
    res.send({ users });
    return;
});


server.get('/users/:id', (req, res) => {
    const findId = req.params.id;
    const foundName = Object.keys(users)[findId];

    if (!foundName) {
        res.status(STATUS_USER_ERROR);
        res.send({ error: `The User ID ${findId} was not found.`});
        return;
    }

    res.status(STATUS_SUCCESS);
    res.send({ foundName });
    return;
});

server.get('/search', (req, res) => {
    const searchName = req.query.name;
    let searchResult = [];

    if (!searchName || searchName === '') {
        res.status(STATUS_USER_ERROR);
        res.send({ error: `Search term not provided.`});
        return;
    }

    searchResults = Object.keys(users).filter(user => {
        if (user.toLowerCase().includes(searchName.toLowerCase())) return user;
    });

    if (searchResults.length > 0) {
        res.status(STATUS_SUCCESS);
        res.send({ searchResults });
        return;
    }
    res.status(STATUS_USER_ERROR);
    res.send({ error: `No users with name ${searchName} found`});
    return;
});



server.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(STATUS_USER_ERROR);
        res.send({ error: 'A name must be specified'});
        return;
    }

    users[name] = id;
    res.status(STATUS_SUCCESS);
    res.send(id + '');
    id++;
    return;
});

server.delete('/users/:id', (req, res) => {
    const findId = req.params.id;
    const foundName = Object.keys(users)[findId];

    if (!foundName) {
        res.status(STATUS_USER_ERROR);
        res.send({ error: `The User ID ${findId} was not found.`});
        return;
    }

    delete users[foundName];
    res.status(STATUS_SUCCESS);
    res.send({ success: `The User ID ${findId} (${foundName}) was deleted.` });
    return;
});


server.listen(PORT, err => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});
