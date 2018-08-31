const express = require('express');
const cors = require('cors');
//pull in helper method to get user data
const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');


// const db = require ('./data/dbConfig.js');

const server = express();

server.use(express.json()); //allows parsing of json data from req.body
server.use(cors());

// //Middleware here (practice)
// function greeter(req, res, next) {
//     req.name = 'FSW 12: Middleware Enthusiasts';
//     next();
// }


//Middleware to capitalize user name

//use if typeOf(req.body.name)...

function capitalize(req, res, next) {
    console.log(req.body) // empty object
    console.log(req.body.name) //undefined
    const name = req.body.name
    capName = name.toUpperCase();
    next();
}


//Initiate the Server at /
server.get('/',(req, res) => {
    res.send('Initiating Server');
});

// //using greeter function (practice)
// server.get('/hello', greeter, (req,res) =>{
//     res.send(`hello ${req.name}`);
// });


// ------------------------- Endpoints for Users -----------------------
//GET request for retrieving all users needs: 'const users = require('./data/helpers/userDb')' to work
server.get('/users', (req,res) => {
    users
        .get()
        .then(users => {
            res.json(users);
        })    
    .catch(err => {
        console.error('error', err);
        res.status(500).json({message: 'Error getting users'});
        return;
    });
});

//GET request for retrieving individual user
server.get('/users/:id', (req,res) => {
    const id = req.params.id;
    users
    .get(id)
    .then(user => {
        if (user === 0) {
            res.status(404).json({message: 'No user corresponding to that identifier'});
            return;
        }
        res.json(user);
    })
    .catch(err =>{
        res.status(500).json({message: 'Error getting user information'});
        return;
    });
});


//POST request
server.post('/users', capitalize, (req,res) => { //add capitalize function between route and (req,res)
    const name = req.body.name;
    const capName = req.capName;
    console.log(capName);
    if (name.length === 0){
        res.status(400).json({message:"character must have a name"})
    }
    users
    .insert({name: capName}) //replace with capName?
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({message: 'Error posting user information'});
        return;
    });
});

//post works, but capitalize doesn't work

//DELETE a user
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users
    .remove(id)
    .then(remove => {
        if(remove === 0) {
            res.status(404).json({message: 'No user corresponding to that identifier'});
            return;
        }else{
            res.json({success: 'User Successfully Removed'});
        }
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({message: 'Error accessing user information'});
        return;
    });
});


//PUT Request to Modify an individual user
server.put('/users/:id', (req,res) => {
    const id = req.params.id;
    const name = req.body.name;
    if(!name){
        res.status(400).json({message: 'Must provide title and contents'});
        return;
    }
    users
        .update(id, name)
        .then(response => {
            if(response == 0){
                res.status(404).json({message:'There is no post with that identifier'});
                return;
            }else{
                res.status(200).json({message: 'successful update'});
            }
            users
                .findById(id)
                .then(updated => {
                    if(updated.length === 0){
                    res.status(404).json({message: 'Unable to find specified user'});
                    return;
                    }
                    res.json(updated);
                })
                .catch(err => {
                    console.log("error", err)
                    res.status(500).json({message: 'Error looking up user'});
                });
            })
            .catch(err=> {
                console.log("error", err)
                res.status(500).json({message: 'problem encountered in database'});
                return;
            });
        });

//GET request to retrieve posts by user id

server.get('/users/posts/:userId', (req,res)=> {
    const userId = req.params.userId;
    users
    .getUserPosts(userId) //function defined in 'userDb.js'
    .then(userPosts => {
        if (userPosts===0){
            res.status(404).json({message: 'Unable to find specified user'});
            return;
        }
        res.json(userPosts);
    })
    .catch(err => {
        console.log("error", err)
        res.status(500).json({message: 'problem encountered in database'});
        return;
    });
});

//  ------------------- Endponts for posts --------------------

//GET request for retrieving all posts needs: 'const posts = require('./data/helpers/postDb')' to work

server.get('/posts', (req,res) => {
    posts
        .get()
        .then(getPosts => {
            res.json(getPosts);
        })    
    .catch(err => {
        console.error('error', err);
        res.status(500).json({message: 'Error getting posts'});
        return;
    });
});

//GET request to retrieve specific post

server.get('/posts/:id', (req,res) => {
    const id = req.params.id;
    posts
        .get(id)
        .then(post => {
            if (post === 0){
                res.status(404).json({message: 'Unable to find specified post'});
                return;
            }
            res.json(post);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({message: 'Error getting post'});
            return;
       });
   });
//POST request to list of 'posts'
server.post('/posts', (req,res) => {
   const {userId, text} = req.body;
   posts
       .insert({userId, text})
       .then(response => {
           res.json(response);
       })
       .catch(error => {
           console.error('error', error);
           res.status(500).json({message: 'Error getting post'});
           return;
       });
});
//GET the tags for a given post
server.get ('/posts/tags/:id', (req,res) => {
   const id =req.params.id;
   posts
       .getPostTags(id)
       .then(postTags => {
           if(postTags === 0) {
               res.status(404).json({message: 'Unable to find specified post'});
               return;
           }
           res.json(postTags);
       })
       .catch(error => {
           console.error('error', error);
           res.status(500).json({message: 'Error getting post'});
           return;
       });
});
//GET all of the tags
server.get('/tags', (req,res) => {
   user
       .get()
       .then(tags => {
           res.json({ tags });
       })
       .catch(error => {
           console.error('error', error);
           res.status(500).json({message: 'Error getting post'});
           return;
       });
})
  
server.listen(3001, () => console.log("server 3001 started"));


