const express = require('express');
const users = require("./data/helpers/userDb.js");

const server = express();
const PORT = 4000;

server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: 'request recieved!'});

});

server.get('/users', (req, res) => {
    users.get()
        .then(users =>{
            res
               .status(200)
               .json(users)
        })
        .catch(err => {
            res
            .status(500)
            .json({error: "Unable to find users"})
        })

});

server.listen(PORT, err => {
    console.log(`Listening on port ${PORT}`);
});