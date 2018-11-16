const express = require ('express');
const helmet = require ('helmet');
const morgan = require ('morgan');
const dbUsers = require ('../data/helpers/userDb');
const dbPosts = require ('../data/helpers/postDb');
const toUpperCase = require ('../middleware/toUpperCase.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/users', (req, res) => {
    dbUsers.find()
    .then(users => {
        res.status(200).json(users.toUpperCase());
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved!", err })
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    dbUsers.getUserPosts(id)
    .then(user => {
        if (user.length === 0){
            res.status(404).json({ message: "The User with the specified ID does not exist" })
        }else { res.status(200).json(user.toUpperCase()) }
    });
});


server.get('/posts', (req, res) => {
    
});

module.exports = server;