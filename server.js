const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3030;

const STATUS_USER_ERROR = 422;

app.use(bodyParser.json());

const users = [];
let id = 0;

app.get('/users', (req, res) => {
    const user = req.body.user;
    if (id === 0) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'No users added, nothing to display.' });
        return;
    }

    res.status = 200;
    res.json({ users });
    return;
});


app.post('/users', (req, res) => {
    users[req.body.name] = id;
    res.send(id + '');
    id++;
});


app.listen(PORT, err => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});
