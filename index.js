const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const server = express();
const NUM = 4444;

server.use(express.json());


server.get('/api/users', (req,res) => {
    userDB.get()
    .then((users) => {res.json(users)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get users'})})
} )

server.get('/api/posts', (req,res) => {
    postDB.get()
    .then((posts) => {res.json(posts)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get posts'})
    })
})

server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;
    console.log (req.Route)


    userDB.get(id)
    .then( user => {
        if (user) {res.json(user)}

        else { 
            res
            .status(404)
            .json({message:"The user with the specified ID does not exist."})}
    })
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get user"})
    })
})

server.get('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    console.log(req)
    postDB.get(id)
    .then( user => {
        if (user) {res.json(user)}

        else { 
            res
            .status(404)
            .json({message:"The post with the specified ID does not exist."})}
    })
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
})

server.post('/api/users', (req,res) => {
    const user = req.body;
    console.log(user)
    if (user.name){
        userDB.insert(user)
    .then(info => {
        userDB.get(info.id).then(response => {
            res
            .status(201)
            .json(response)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get user"})
    })
    }

    else {
        res
        .status(400)
        .json({message: "missing name"})
    }
    
})

server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;
    userDB.remove(id)
    .then(count => {
        if (count) {
            res.json({message: "User deleted"})}

        else {
            res
            .status(404)
            .json({message: "User with this ID does not exist."})
        }

    })
    .catch(err => {
        res
        .status(500)
        .json({message: "User could not be deleted"})
    })
})

server.put('/api/users/:id', (req,res) => {
    const user = req.body;
    const {id} = req.params;
    if (user.name) {
        userDB.update(id, user)
        .then(count => {
            if (count) {
                userDB.get(id).then( data => {
                    res.json(data)}
                )
            }

            else { res
                .status(404)
                .json({message:"The user with the specified ID does not exist."})}
        })
        .catch(
            err => {
                res
                .status(500)
                .json({error: "The user could not be updated"})
            }
        )

    }

    else {
        res
        .status(400)
        .json({message: "missing name"})
    }

})

server.listen(NUM, () => console.log(`listening on port ${NUM}`))