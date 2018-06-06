const cors = require('cors');
const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const port = 5454;
const server = express();
server.use(express.json());
server.use(cors());

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.get('/', (req, res) => {
    // 1st argL route where a resource can be interacted with
    // 2nd arg: call back to deal with sending responsevs, and handling incoming
    res.send('Hello from express')

});




server.listen(port, ()=> console.log(`Server running on port ${port}`));