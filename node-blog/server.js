const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');
const port = 5000;
const helmet = require('helmet');

server.listen(port , () => console.log('API Running on port 5000'));

server.get('/', function(req, res){
    res.send({api: 'Running...'})
});

server.use(helmet());
server.use(express.json());

server.get('/api/users', function(req, res){
    userDB
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({error:'Users not Found'})
    })
});

server.get('/api/users/:id', function(req, res){
    const {id} = req.params
    userDB
    .get(id)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({error:'Users not Found'})
    })
});