//express
//cors
const express = require('express');
const cors = require('cors'); 

const port = 5555;
const server = express(); 
server.use(express.json()); 
server.use(cors({ origin: 'http://localhost:3000'})); 

//database helpers
const posts = require('./data/helpers/postDb.js')
const usersDb = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/tagDb.js')

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message});
    return; 
}; 

const customLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = { path, ua, timeStamp };
    const stringLog = JSON.stringify(log); 
    console.log(stringLog);
    next();    
}; 

server.use(customLogger); 

const searchMiddleWare = (req, res, next) => {
    if (!req.query.name) {
        next (); 
    }
    usersDb
        .get()
        .then(users => {
            const { name } = req.query; 
            const filteredUsers = users.filter(
                user => user.name.toLowercase() === name.toLowercase() 
             ); 
             req.users = filteredUsers;
             next();
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There's an error!" }); 
        });
}; 

server.get('/',searchMiddleWare, (req, res) => {
    console.log(req.query); 
    console.log(req.users); 
    const { users } = req;
    if (!users) {
        res.json('Welcome to Middle Earth!')
    }
    if (users.length === 0) {
        sendUserError(404, `No ${req.query.name} in Middle-Earth`, res);
        return;
    } else {
        res.json({ users }); 
    }
});

server.get('/api/users', (req, res) => {
    usersDb
        .get()
        .then(users => {
            res.json({ users }); 
        })
        .catch(error => {
            sendUserError(500, 'The user information could not be retrieved.', res);
            return;
        });
}); 

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params; 
    usersDb
        .getUserPosts(id)
        .then(user => {
            res.json(user); 
        });
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        sendUserError(400, 'Must provide a name.', res);
        return;
    }
    usersDb   
        .insert({ id, name })
        .then(response => {
            res.status(201).json(response); 
        });    
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    usersDb   
        .remove(id)
        .then(response => {
            res.json({ success: `User with id: ${id} removed from system.`}); 
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body; 
    if (!name) {
        sendUserError(400, "Must provide name", res);
        return;
    }
    usersDb   
        .update(id, {name })
        .then(response => {
            if (response = 0) {
                sendUserError (
                    404,
                    "The user with the specified ID does not exist.",
                    res
                );
                return;
            }
        });
}); 


// server.get('/api/posts')
// server.get('api/tags')

server.listen(port, () => console.log(`Server running on port ${port}`));


