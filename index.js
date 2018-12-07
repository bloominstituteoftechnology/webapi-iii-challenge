const express = require('express');
const userdb = require('./data/helpers/userDb');

const server=express();
const PORT = 5555;
server.use(express.json());

//custom middleware to make sure POST and PUT requests have names properly capitalized
function nameCap(req, res, next) {
    //first pull name off the sent request
    let {name} = req.body;
 //then reassign that value with one where all first letters have been capitalized
    req.body.name=name.toLowerCase().split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
 //then call the next middleware (in this example, the POST and PUT routehandlers)
    next();
}

//CRUD get
server.get('/api/users', (req, res) =>{
    userdb.get()
    .then(users=>{
        res.status(200)
        .json(users)
    })
    .catch(error =>{
        res.status(500)
        .json({error: "The users could not be retrieved."})
    })
})

//GET by id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userdb.get(id)
    .then(user => {
        res.status(200)
        .json(user);
    })
    .catch(error => {
        res.status(500)
        .json({message: "The user info could not be retrieved."})
    })
})

//POST
server.post('/api/users', nameCap, async (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400)
        .json({message: "Please provide a name for the new user."})
    } else {
        try {
            const userInfo = req.body;
            const userId  =await userdb.insert(userInfo);
            res.status(201).json(userId);
        } catch (error) {
            res.status(500).json({error: "An error occurred while saving this user."})
        }
    }
})

//UPDATE
server.put('/api/users/:id', nameCap, (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (!changes.name) {
        res.status(400)
        .json({error: "Please provide the updated user's name."})
    } else {
        userdb.update(id, changes)
        .then(count => {
            if (count) {
            res.status(200)
            .json(count);
        } else {
            res.status(404)
            .json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500)
        .json({error: "The user info could not be modified."})
    })
    }
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userdb.remove(id)
    .then(count=>{
        if (count) {
        res.status(200)
        .json(count);
    } else {
        res.status(404)
        .json({message: "The user with the specififed ID does not exist."})
    }
    })
    .catch(error=>{
        res.status(500)
        .json({error: "The user could not be removed."})
    })
})

server.listen(PORT, ()=>console.log('Server is listening on port 5555')); 