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

server.post('/users', (req, res) => {
    console.log(req.body)
    const {user} = req.body;
    dbUsers.insert({user})
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

server.listen(8000, () => console.log('\n== API on port 8000 ==\n'));