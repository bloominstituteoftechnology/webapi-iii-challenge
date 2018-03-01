const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');

const STATUS_APPROVED = 200;
const STATUS_USER_ERROR = 422;

server.use(express);
server.use(bodyParser.json());


let users = {};

server.post('/users', (req, res) => {
    const username = req.body.username;
    if (!username) {
        res.status(STATUS_USER_ERROR);
        res.json({ err: `Must provide a username` });
        return;
    }
});

server.get( '/users', (req, res) => {

});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on on http://localhost${ port }`);
});


