const express = require('express');
const helmet = require('helmet');

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

const port = 8000;
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

server.get('/api/users', (req, res) => {
    users.get().then(u => {
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved'})
    })
});
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users.get(id).then(u => {
        if(u.length === 0) {
            res.status(404).json({ error: 'The user with specified ID does not exist' });
        }
        res.status(200).json(u)
    })
    .catch(err => {
        res.status(500).json({ error: 'The users information could not be retrieved'})
    })
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({ error: 'Please provide user name' });
        res.end(); // <-- needed or not?
    }
    users.insert({ name }).then(u => {
        res.status(201).json(u);
    })
    .catch(err => {
        res.status(500).json({ error: 'There was an error while saving the user to the database' })
    })
})


server.listen(port, () => console.log(`Server is listening on port ${port}`))