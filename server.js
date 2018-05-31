const express = require('express');
const cors = require('cors');
const dbConfig = require('./data/dbConfig');


const port = 5000;
const server = express();
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


const sendUserError = (status, message, res ) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const middleWare = (req, res, next) => {
    const 
    next();
};
server.use();

server.get('/', middleWare, (req, res) => {
    const { id } = req.params;
    console.log(id)
    res.send('hello');
});

server.post('/api/users', (req, res) => {
    const { name, bio, }
})