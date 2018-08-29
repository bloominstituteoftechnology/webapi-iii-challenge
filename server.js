const express = require('express');
const users = require('./data/helpers/userDb');

// const db = require ('./data/dbConfig.js');

const server = express();

server.use(express.json()); //allows parsing of json data from req.body

//Middleware here (practice)
function greeter(req, res, next) {
    req.name = 'FSW 12: Middleware Enthusiasts';
    next();
}

//Initiate the Server at /
server.get('/',(req, res) => {
    res.send('Initiating Server');
});

server.get('/hello', greeter, (req,res) =>{
    res.send(`hello ${req.name}`);
});

//GET request for retrieving all users
server.get('/api/users', (req,res) => {
    users
        .get()
        .then(getUsers => {
            res.json(getUsers);
        })    
    .catch(err => {
        console.error('error', err);
        res.status(500).json({message: 'Error getting users'})
    });
});

//Start the server
server.listen(9000, () => console.log('\n == API on port 9000 == \n'));