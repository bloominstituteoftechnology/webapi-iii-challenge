const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3333;
const STATUS = 200;

let idCount = 5;
const users = {
    1: 'Tommy',
    2: 'Amanda',
    3: 'Nate',
    4: 'Jenniffer',
    5: 'Russell',

};


server.get('/users', (req, res) =>{
    res.status(STATUS);
    res.send(users);
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.status(STATUS);
    res.send(users[id]);
})

server.use(bodyParser.json());

server.post('/users', (req, res) => {
    console.log(req.body)
    const { user } = req.body;
    idCount++;
    users[idCount] = user;
    res.status(STATUS);
    res.send({id: idCount})
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    delete users[id];
        res.status(STATUS);
        res.send(users);
})

server.listen(PORT, (err) => {
    if (err) {
        console.log('There was an error: ', err);
    } else {
        console.log('Server listening on port: ', PORT)
    }
});