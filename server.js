const express = require('express');

const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/userDb.js')


const port = 5555;
const server = express();
server.use(express.json()); 

server.get('/api/users')
server.get('/api/posts')
server.get('/api/tags')

//Logging middleware
const log = (req, res, next) => {
    console.log("req", req);
    console.log("res", res);
    next();
}

server.use(log);

//CRUD for Users

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'No name' });
        return;
    }
    users
        .insert({name})
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err);
        });
    
})

server.get('/api/usrs', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            console.log(err);
        })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    users
        .update(id, {name})
        .then(count => {
            if (count !== 1){
                res.status(400).json({errorMessage: 'Did not update'});
            } else {
                res.status(201).json({id, name});
            }
        })
        .catch(err => {
            console.log(err);
        })
})

server.delete('/api/user/:id'), (req, res) => {
    const {id} = req.params;
    users
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(400).json({errorMessage: 'Did not delete'});
            } else {
                res.status(201).json(201).json({message: 'successfully deleted'});
            }
        })
        .catch(err => {
            console.log(err);
        })
}

server.listen(port, () => console.log(`Server running on port ${port}`));