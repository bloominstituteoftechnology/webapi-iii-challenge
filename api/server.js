const express = require('express');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

//middleware
function upperCheck(req,res,next) {
    let name = req.body.name;

    if(name){
        req.body.name = name.toLowerCase().split(' ').map(str => str.charAt(0).toUpperCase() + str.substring(1)).join(' ');
        next();
    }
    else{
        res.status(400).json({message: 'Please provide a name for the user.'})
    }
}

function checkUser(req,res,next) {
    userDb.get(req.params.id)
        .then(user => {
            if(user){
                next();
            }
            else{
                res.status(404).json({message: `user of id: ${req.params.id} not found.`})
            }
        })
}

server.use(helmet());
server.use(express.json());
server.use(morgan('short'));
server.use(cors());

//routes
server.get('/', (req, res) => {
    res.send('<h1>Project Time! </br> Users and Posts!</h1>')
});

server.get('/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json({users})
        })
        .catch(err => {
            res.status(500).json({error: 'Could not retrieve users'})
        });
});

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
    .then(user => {
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({message: `user of id: ${req.params.id} not found.`})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'could not retrieve user', error: err});
    })
});

server.post('/users', upperCheck, (req, res) => {
    userDb.insert(req.body)
        .then(result => {
            res.status(201).json({message: `successfully added user. New user id: ${result.id}`});
        })
        .catch(err => {
            res.status(500).json({message: 'Could not add user', error: err})
        })
});

server.put('/users/:id', upperCheck, checkUser, (req,res) => {
    userDb.update(req.params.id,req.body)
        .then(count => {
            res.status(200).json({message: `user of id:  ${req.params.id} successfully updated`})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not update user', error: err});
        })
})

server.delete('/users/:id', checkUser, (req, res) => {
    userDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `user of id: ${req.params.id} successfully deleted`})
        })
        .catch(err => {
            res.status(500).json({message: 'could not remove user', error: err});
        })
});

//exports
module.exports = server;
