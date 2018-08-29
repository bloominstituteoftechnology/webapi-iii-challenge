const express = require('express');

const dbUsers = require('./data/helpers/userDb.js')
const dbPosts = require('./data/helpers/postDb.js')

const server = express();

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
            res.status(200).json(users);
        }) 
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The User ID could not be retrieved."})
        })
})

server.post('/users', (req, res) => {
    console.log(req.body)
    const user = req.body;
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
            res.status(204).end();
        }) 
        .catch(err => res.status(500).json(err));
})

server.put('/users/:id', (req, res) => {
        dbUsers.update(req.params.id, req.body)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => res.status(500).json({ message: "Update Failed"}))
})

server.listen(8000, () => console.log('\n== API on port 8000 ==\n'));