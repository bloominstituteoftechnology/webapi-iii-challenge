const express = require('express');
const db = require('./data/helpers/userDb.js');
const server = express();
server.use(express.json());



server.get('/users/:id', (req, res) => {
    db.get(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.listen(7000);