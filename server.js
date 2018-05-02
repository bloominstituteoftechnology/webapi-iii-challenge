//importing
const express = require('express');

//server run
const server = express();

//databases
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// middleware
server.use(express.json());

//get method initial
server.get('/', (req, res) => {
    console.log('Running');
    res.send('Running now!');
})

//get



//server attached to a port
const port = 5000;
server.listen(port, () => {'== Server is listening on port 5000 =='});