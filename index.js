const express = require('express');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');

const server = express();

const PORT = 5000;


server.use(express.json());

server.get('/api/users', (req, res)=>{
    userDB.get()
    .then(users=>{
        res.json(users);
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'})
    })
});

server.get('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    userDB.get(id)
    .then(user=>{
        res.json(user);
    })
    .catch(error=>{
        res.status(500).json({error: 'The information could not be retrieved.'})
    })
})

server.listen(PORT, err=>{
    console.log(`Server running on port: ${PORT}`);
});