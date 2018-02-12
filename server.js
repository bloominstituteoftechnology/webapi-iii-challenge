const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3040;

app.use(bodyParser.json());

const users = [
    {
        "id": 0,
        "name": "Williams"
    },
    {
        "id": 1,
        "name": "JayZ"
    },
    {
        "id": 2,
        "name": "Troy"
    },
    {
        "id": 3,
        "name": "Sam"
    }
];
let userId = 4;

app.post('/users', (req, res) => {
    users.push({
        id: userId++,
        name: req.body.name
    });
    res.send(users);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    res.json(users.filter(user => user.id.toString() === req.params.id));
});

app.get('/search', (req, res) => {
    res.json(users.filter(user => req.query.name.toLowerCase() === user.name.toLowerCase()));
});

app.delete('/users/:id', (req, res) => {
    res.json(users.filter(user => user.id.toString() !== req.params.id));
});


app.listen(PORT, err => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`)
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});
