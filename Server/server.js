const express= require('express');
const bodyParser= require('body-parser');

const server = express();
const PORT = 5000;

let idCounter = 3;
const users = {
    1: 'ivanmora@lambda.com',
    2: 'seanchen@lambda.com',
    3: 'joshknell@lambda.com'
};

server.use(bodyParser.json());

server.get('/', (req, res) => {
    if (req.query.user) {
        let user = null;
        Object.keys(users).forEach((id => {
            if (users[id] === req.query.user) {
                user = id;
            };
        }));
        res.status(200);
        res.send(user);
    } else {
        res.status(200);
        res.send(users);
    }
});

server.get('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200);
    res.send(users[id])
});

server.post('/', (req, res) => {
    const {
        user
    } = req.body;
    idCounter++;
    users[idCounter] = user;
    res.status(200);
    res.send({ id: idCounter });
});

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})