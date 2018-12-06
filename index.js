const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const dbUsers = require('./data/helpers/userDb');
const dbPosts = require('./data/helpers/postDb');

const server = express();
const PORT = '4500';

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));


//Get method for users/posts
server.get('/', (req,res) => {
     res.json({Message: "Working now"});
});

server.get('/users', (req,res) => {
    dbUsers.get()
           .then(users => {
                console.log(users);
                res.json(users);
           })
           .catch(err => {
                res.status(500).json({errorMessage: ""})
           });
});

server.get('/posts', (req,res) => {
     dbPosts.get()
            .then( posts => {
                 console.log(posts);
                 res.json(posts);
            })
            .catch(err => {
                 res.status(500).json({errorMessage: ""})
            });
 });
//Get the users and posts by ID
server.get('/users/:id', (req,res) => {
     const {id} = req.params;
     console.log(id);
     dbUsers.get(id)
            .then( user => {
                if(user) { 
                res.json(user);
                }
                 else {
                 // 404 invalid ID.
                     res.status(404).json({ message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
               res.status(500).json({errorMessage: "The user information could not be retrieved."})
          });
});

server.get('/posts/:id', (req,res) => {
     const {id} = req.params;
     console.log(id);
     dbPosts.get(id)
            .then( post => {
                if(post) { 
                res.json(post);
                }
                 else {
                 // 404 invalid ID.
                     res.status(404).json({ message: "The post with the specified ID does not exist."});
                }
            })
            .catch(err => {
               res.status(500).json({errorMessage: "The user information could not be retrieved."})
          });
})
server.listen(PORT, () => {
     console.log(`Server is running at ${PORT}`);
})