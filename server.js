const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000

app.use(bodyParser);

const users = [];
let userId= 0;

app.use('/', (req, res, next) => {
    console.log('Request type:', req.method)
    next();
});

app.get('/users/:user', (req, res) => {
    res.send(users [req.params.name] + "" || "This User Does Not Exist")
});

app.post('/users', (req, res) => {
    userId ++;
    users[req.body.name] = userId;
    res.send(userId + "");
});

app.listen(PORT, err => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`)
    } else {
        console.log(`App listening on port ${PORT}`)
    }
});