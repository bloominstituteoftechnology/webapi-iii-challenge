const express = require('express');
//pull in helper method to get user data
const users = require('./data/helpers/userDb');

// const db = require ('./data/dbConfig.js');

const server = express();

server.use(express.json()); //allows parsing of json data from req.body

// //Middleware here (practice)
// function greeter(req, res, next) {
//     req.name = 'FSW 12: Middleware Enthusiasts';
//     next();
// }


//Middleware to capitalize user name
function capitalize(req, res, next) {
    req.name = req.body.toUpperCase();
    next;
}


//Initiate the Server at /
server.get('/',(req, res) => {
    res.send('Initiating Server');
});

// //using greeter function (practice)
// server.get('/hello', greeter, (req,res) =>{
//     res.send(`hello ${req.name}`);
// });

//GET request for retrieving all users needs: 'const users = require('./data/helpers/userDb')' to work
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

//GET request for retrieving individual user
server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    users
    .get(id)
    .then(user => {
        if (user===0) {
            res.status(404).json({message: 'No user corresponding to that identifier'});
            return;
        }
        res.json(user);
    })
    .catch(err =>{
        res.status(500).json({message: 'Error getting user information'})
    });
});


//Start the server
server.listen(9000, () => console.log('\n == API on port 9000 == \n'));