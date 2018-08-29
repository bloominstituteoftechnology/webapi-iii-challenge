const express = require('express');
const server = express();
const dbUser = require('./data/helpers/userDb.js');

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Welcome to Node-Blog, an express middleware production');
} );

server.get('/api/users', (req, res) => {
    dbUser.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error('error', err);

        res.status(500).json({ error: 'The users information could not be retrieved.' });
    })
})

server.listen(8000, () => console.log('/n== API on port 8k ==/n') );