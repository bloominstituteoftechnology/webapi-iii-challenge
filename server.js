// importing node modules 
// importing express and db
express = require('express');
cors = require('cors');
db = require('./data/dbConfig');

// database helpers
posts = require('./data/helpers/postDb');
users = require('./data/helpers/userDb');
tags  = require('./data/helpers/tagDb');

// server code 
port = 5000;
server = express();
server.use(express.json());


// root route 
server.get('/', (req, res ) => {
    res.send('Hello from express node blog');
});

// ====== GET Requsts ===========
// Users
server.get('/api/users', (req, res) => {
    users
    .get()
    .then(user => res.json(user))
    .catch(error => {
        res.json(error)
    })
});

// Posts
server.get('/api/posts', (req, res) => {
    posts
    .get()
    .then(post => res.json(post))
    .catch(error => {
        res.json(error)
    })
});

// ================================

// =======  GET Request by ID ==========
// USERS
server.get('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    users
    .get(id)
    .then(user => {
        if(!user){
            return res.status(404).json({error: "Could not locate user"})
        }
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).res,json(error)
    })
});

// POSTS
server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    posts.get(id).then(post => {
        if(post.length === 0){
            return res.status(404).json({error: "Could not locate post"})
        }
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).res.json(error)
    })
})
// ==========================================================

// ===========POST Routes====================================
//USERS
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name){
        return res.status(404).json({errorMessage: "Please provide name for user"})
     }
    users
    .insert({name})
    .then(user => 
        res.json(user))
    .catch(err => {
        res.status(500).res.json(error)
    })
})

// POSTS
server.post('/api/posts', (req, res) => {
    const { userId } = req.params;
    const { text } = req.body;
    const post = { userId, text };
    if(!text){
        return res.status(404).json({errorMessage: "Please provide some text for the post"})
     }
    posts
    .insert({userId, text})
    .then(post => 
        res.json(post))
    .catch(err => {
        res.status(500).json(err)
    })
})
//=====================================================================================


// DELETE ROUTE 
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users.remove(id).then(user => {
        if(!user){
            return res.status(404).json({errorMessage:"Could not remove user, please try again" })
        }
        res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).res,json(error) 
    }) 
})

// UPDATE ROUTE
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    users
    .update(id, {name})
    .then(user =>{
        res.json(user)
    .catch(error => {
        res.status(500).json(error)
    })
    })
})

server.listen(port, () => console.log(`Server running on port ${port}`));