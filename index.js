const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3000;

let idCounter = 4;
const users = {
    1:'GGG',
    2: 'RRR',
    3: 'YYY',
    4: 'ggg'
};

server.use(bodyParser.json());

server.get('/users/', (req, res) => {
    res.status(200);
    res.send(users);
})

server.get('/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.status(200);
    res.send(users[id]);
})

server.get('/search', (req, res) => {
    let user = [];
    Object.keys(users).forEach((id => {
        if (users[id].toLowerCase() === req.query.name.toLowerCase()) {
            user.push(id);
        };
    }));
    res.status(200);
    res.send(user);
})

server.post('/users', (req,res) => {
    // const  user = { id: idCounter++, ...req.body };
    // user = [...users, user];
    // res.status(201).json(users);
    const { user } = req.body;
    idCounter++;
    users[idCounter] = user;
    res.status(200);
    res.send({id: idCounter});
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    delete users[id];
    res.status(200);
    res.send(users);
    
});

// server.post("/", (req, res) => {
//     const {
//       friend
//     } = req.body;
  
//     idCounter++;
//     friends[idCounter] = friend;
//     res.status(200);
//     res.send({ id: idCounter });
//   });


server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
});