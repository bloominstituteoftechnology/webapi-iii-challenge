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

//Server put
server.put('/users/:id', (req,res) => {
       const {id} = req.params;
       const user = req.body;
       if(user.name) {
            dbUsers.update(id, user)
                   .then( count => {
                       if(count) {
                           dbUsers.get(id)
                                   .then(user => {
                                        res.status(201).json({Message: "Updated successfully"})
                                   })
                        } else {
                           res.status(404).json({errorMessage: "There is no user with that ID"});
                       }

                    })
                   .catch( err => { // 500 error
                        res.status(500).json({errorMessage: "User could not be modified"});
                   });
       } else {
            res.status(400).json({Message:"User name required"});
       }
});

server.post('/users', (req,res)=> {
       const user = req.body;
       if(user.name) {
           dbUsers.insert(user)
                  .then(userId => {
                       console.log(userId)
                    dbUsers.get(userId.id)
                           .then(newUser => {
                                res.status(201).json(newUser);
                           })

                  })
                  .catch();
       } else {
          
       }    
});
server.listen(PORT, () => {
     console.log(`Server is running at ${PORT}`);
})