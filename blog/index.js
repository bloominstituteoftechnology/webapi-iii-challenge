const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb.js');
const postDb = require('../data/helpers/postDb.js');

const server = express();

server.use(cors());
server.use(express.json());

const port = 9000;

//Middlewares
server.use(morgan('combined'));

//Routes
server.get('/', (req, res)=> {
    res.send('Welcome to Node Blog :)')
});

server.get('/api/users/:id', (req, res)=> {
    console.log(req.query);
    userDb.get(req.query)
     .then(user=> {
         if (user) {
             res.status(200).json(user)
         } else {
             res.status(404).json('User not found');
         }
     })
     .catch(err=> {
         res.status(500).json({error: "The user information could not be retrieved."});
     });
 });

//Listener
server.listen(port, ()=> console.log(`API running on port ${port}`));