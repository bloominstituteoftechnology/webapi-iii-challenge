const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3333;
const STATUS = 200;

let idCount = 5;
let users = [
    {id: 1, name: 'Tommy'},
    {id: 2, name: 'Amanda'},
    {id: 3, name:  'Nate'},
    {id: 4, name: 'Jenniffer'},
    {id: 5, name: 'Russell'},

];


server.get('/users', (req, res) =>{
    res.status(STATUS);
    res.send(users);
});

server.get('/users/:id', (req, res) => {
    let userId = req.params.id;
    let id = parseInt(userId);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            id = i;
            console.log(i);
        }
    }

    res.status(STATUS);
    res.send(users[id]);
    console.log(id);
});

server.get('/search', (req, res) => {
    let name = req.query.name;
    console.log(name);
    let userArray = [];

    if(name) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].name.toUpperCase() === name.toUpperCase()) {
                userArray.push(users[i].name);
                console.log(users[i]);
            }
        }
    }

    res.status(STATUS);
    res.send(userArray);
});

server.use(bodyParser.json());

server.post('/users', (req, res) => {
    console.log(req.body)
    const { user } = req.body;
    idCount++;
    users[idCount] = user;
    res.status(STATUS);
    res.send({id: idCount})
});

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    newUsers = users.filter(user => user.id.toString() !== id);
    console.log(newUsers)
    users = newUsers;
        res.status(STATUS);
        res.send(users);
});

server.listen(PORT, (err) => {
    if (err) {
        console.log('There was an error: ', err);
    } else {
        console.log('Server listening on port: ', PORT)
    }
});