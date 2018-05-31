const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');

const port = 5555;
const server = express();
server.use(express.json());
//server.use(cors({ orign: 'https://localhost:3000' }));


//database helpers

const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

server.get('/api/users');
server.get('/api/posts');
server.get('/api/tags');

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    //return;
};

server.get('/api/users', (req, res) => {
    db
    .find()
    .then(Promise => {
        res.json({ users });
    })
    .catch(error => {
        sendUserError(500, 'The posts information could not be retrieved.', res);
        return;
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));