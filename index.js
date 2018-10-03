// pull in express
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// instanciate your server
const port = 8000;
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json(), cors(), helmet(), morgan('combined'));

// MIDDLEWARE

const toUpper = (req, res, next) => {
    if (req.body) {
        req.name = req.body.name.toUpperCase();
    } else {
        userDb
            .get(req.params.id)
            .then(res => {
                req.name = res.name.toUpperCase();
            })
            .catch(err => {
                res.status(500).json({ message: err });
            });
    }
    next();
};

// ROUTES
server.get('/', (req, res) => {
    res.status(200).send('Hello from root!')
});

server.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(res => {
            res.status(200).json(res);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});

server.get('/api/users/:id', toUpper, (req, res) => {
    const { id } = req.params;
    userDb
        .get(id)
        .then(res => {
            res.status(200).json(req.name);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});



server.listen(port, () => {
  console.log(`\n=== API running on port: ${port} ===\n`);
});
