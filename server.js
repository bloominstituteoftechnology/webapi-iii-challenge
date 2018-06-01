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
    if (name) {

        users
        .insert({name})
        .then(res => {
            res.status(201).json({name})
        })
        .catch(error => {
            res.status(500).json({message: "Please provide title and contents for the post."});
        })
    }
 });

server.listen(port, () => console.log(`Server is running on port ${port}`));