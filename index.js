// pull in express
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// instanciate your server
const port = 8000;
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json(), cors(), helmet(), logger('combined'));

// ===================== CUSTOM MIDDLEWARE =====================

const upperCase = (req, res, next) => {
    const { name } = req.body;
    if (name) {
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

// ===================== USER ENDPOINTS =====================

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

server.get('/api/users/:id', upperCase, (req, res) => {
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

server.post('/api/users', upperCase, (req, res) => {
    const { name } = req.body;
    userDb
        .insert({ name })
        .then(res => {
            res.status(200).json(res);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    userDb
        .remove(id)
        .then(deletedUser => {
            if(deletedUser === 0) {
                return res
                .status(404)
                .send({ error: `The user with the specified ID: ${id} does not exist.` })
            }
            res.status(200).json(deletedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: `The user could not be removed`})
        });
   
});

server.put('api/users/:id', upperCase, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userDb
        .update(id, { name })
        .then(res => {
            if (res === 0) {
                return res
                .status(404)
                .send({ error: `The user with the specified ID: ${id} does not exist.`})
            } else {
                db
                    .find(id)
                    .then(user => {
                        res.json(user);
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: `The user could not be modified`})
        })
});

// ===================== POST ENDPOINTS =====================

server.listen(port, () => {
  console.log(`\n=== API running on port: ${port} ===\n`);
});
