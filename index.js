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
})


server.listen(port, () => console.log(`Server is listening on port ${port}`))