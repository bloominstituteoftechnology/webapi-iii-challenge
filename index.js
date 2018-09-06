const express = require('express');

const db = require('../dbConfig.js');

const server = express();

//middleware

server.use(express.json());

//routes
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ error: "The user information could not be retrieved." })
        });
})

server.listen(7000, () => console.log('\n== API on port 7k ==\n'));