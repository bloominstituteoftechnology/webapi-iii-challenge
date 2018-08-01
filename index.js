const express = require('express');
const server = express();

const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());

server.get('/users', (req, res) => {
    userDb.get()
        .then(response =>
            res.status(200).json(response)
        )
        .catch(() => {
            res.status(500).json({ error: 'The users data could not be retrieved '})
        })
})



server.listen(8000, () => console.log('\n === API running... === \n'))

