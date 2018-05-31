const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5001;
const server = express();

server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(staus).json({ errorMessage: message });
    return;
}



server.get('/api/users', (req, res) => {
    users.get()
        .then(users => {
            res.json({ users });
        })
        .catch(error => {
            res.json({ error });
        });
});




server.listen(port, () => console.log(`Server running on port ${port}`));