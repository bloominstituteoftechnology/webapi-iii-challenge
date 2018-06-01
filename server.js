const express = require('express');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');
const users = require('./data/helpers/userDb.js');
const cors = require('cors');
const port = 5555;
const server = express();

server.use(cors({origin: 'http://localhost:5555'}));
server.use(express.json());

const customLogger = (req, res, next) => {
    
}
server.get('/', (req, res) => {
    res.send('Hello from express');
});

/*********
 * 
Server Requests Below
 * 
 *********/

/***********
 USERS 
 **********/
 
//GET
server.get(`/api/users`, (req, res) => {
    users
    .get()
    .then(users => {
        res.json({ users })
    })
    .catch(error => {
        res.status(500);
        res.json({error: "The users information could not be retrieved."})
    })
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    if(req.params.id === undefined){
        res.status(404)
        res.json({ message: "The user with the specified ID does not exist." })
    } else {
        console.log(id);
        users
        .get(id)
        .then(message => {
            res.json({message})
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The user information could not be retrieved." })
        })
    }
})

//POST
server.post(`/api/users`, (req, res) => {
    const { name } = req.body
    if (name === undefined) {
        user.status(404)
        user.json({ message: "The user with the specified ID does not exist." })
    } else {
        users
        .insert({name})
        .then(res => {
            res.status(201).json({name})
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
 });

//PUT
server.put('/api/users/:id', (req, res) => {
    const {text, userID} = req.body;
    const {id} = req.params;
    posts.update(req.params.id, req.body)
    .then(post => {
        if (!post){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.json({post})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    users
    .remove(id)
    .then(user => {
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.json({user})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
    })
})

server.listen(port, () => console.log(`Server is running on port ${port}`));