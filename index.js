const express = require('express');

const server = express();

const logger = require('morgan');
const cors = require('cors');

const caps = (req, res, next) => {
    req.user = req.params.user.toUpperCase();
    next();
}

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});

server.get('/users/:user', caps, (req, res) => {
    res.send(`${req.user}`);
})

const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));