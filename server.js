const express = require('express');

const dbUsers = require('./data/helpers/userDb.js')
const dbPosts = require('./data/helpers/postDb.js')

const server = express();

function uppercase (req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

server.use(express.json());

server.get('/users', (req, res) => {
    dbUsers.get(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).json({ error: "The User information could not be retrieved."})
        });
});

server.get('/users/:id', (req, res) => {
    dbUsers.get(req.params.id)
        .then(users => {
            if(users.length > 0) {
                res.status(200).json(users);                
            } else {
                res.status(400).json({ message: "The User with the specified ID could not be retrieved."})
            }
        }) 
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The User ID could not be retrieved."})
        })
})

server.post('/users', uppercase, (req, res) => {
    const user = req.body;
    if(!user) {
        res.status(400).json({ message: "Please provide a name for the User."})
    }
    dbUsers.insert(user)
        .then(() => {
            dbUsers.get()
            .then(user => {
                res.status(201).json(user);
            })
        })        
        .catch( err => {
            console.error('error', err);
            res.status(500).json({ error: "There was an error while saving the User to the Database."})
        })
})

server.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    dbUsers.remove(id)
        .then(count => {
            if(count) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "No User with this ID was found."})
            }            
        }) 
        .catch(err => res.status(500).json(err));
})

server.put('/users/:id', uppercase, (req, res) => {
        dbUsers.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json(user)
                } else {
                    res.status(404).json({ message: "No User with this ID was found."})
                }               
            })
            .catch(err => res.status(500).json({ message: "Update Failed"}))
})

server.listen(8000, () => console.log('\n== API on port 8000 ==\n'));