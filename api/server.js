const express = require ('express');
const helmet = require ('helmet');
const morgan = require ('morgan');
const dbUsers = require ('../data/helpers/userDb');
const dbPosts = require ('../data/helpers/postDb');
const toUpperCase = require ('../middleware/toUpperCase.js');

const server = express();

// server.use(toUpperCase());
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/users', (req, res) => {
    dbUsers.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved!", err })
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    dbUsers.get(id)
    .then(user => {
        if (user.length === 0){
            res.status(404).json({ message: "The User with the specified ID does not exist" })
        }else { res.status(200).json(user)}
    });
});

server.get('/users/:id/posts', (req, res) => {
    const { id } = req.params;
    dbUsers.getUserPosts(id)
    .then(userpost => {
        if (userpost.length === 0){
            res.status(404).json({ message: "The User with the specified ID does not exist" })
        }else { res.status(200).json(userpost) }
    });  
});


server.post('/users', toUpperCase, async (req, res) => {
    console.log('Body:', req.body);
    try {
        const userData = req.body;
        const userId = await dbUsers.insert(userData);
        const user = await dbUsers.get(userId.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: `error in creating user ${user}`, error })
    }
})

server.delete('/users/:id', (req, res) => {
    dbUsers.remove(req.params.id)
    .then(count => {
        if (count) {
         res.status(204).json({ message: `${count} user was deleted` });   
        } else {res.status(404).json({ message: `404 ${count} user not found` })}
        
    })
    .catch(error => {
        res.status(500).json( { message: "There was an error deleting user", error } )
    })
})

server.put('/users/:id', (req, res) => {
    dbUsers.update(req.params.id, req.body)
    .then(count => {
        if(count){
        res.status(200).json(`${count} user was updated`)     
        } else{ res.status(404).json({ message: 'user does not exist' }) }
       
    })
    .catch(error => {
        res.status(500).json({ message: 'Error Updating The User', error })
    })
})



module.exports = server;