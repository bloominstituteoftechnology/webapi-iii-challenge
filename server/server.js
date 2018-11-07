const express = require('express');
const users = require('../data/helpers/userDb');

const server = express();
server.use(express.json());


const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
}

//get users
server
    .get('/', (req, res) => {
        res.status(200).json({ api: 'running' });
    });

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            return sendErrorMsg(500, 'Users information could not be retrieded', res)
        });
});

server
    .get('/api/users/:id', (req, res) => {
        const { id } = req.params;

        users
            .get(id)
            .then(user => {
                if (user[0]) {
                    sendErrorMsg(404, 'The post with the specified ID does not exist.', res);
                } else {
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'No User by that Id', res);
            });
    });

// new user
server
    .post('/api/users', (req, res) => {
        const { name } = req.body;

        users
            .insert({ name })
            .then(response => {
                res.status(200).json({ name: `${req.body.name}` })
            })
            .catch(err => {
                return sendErrorMsg(500, 'Name is not added to DB'.res)
            });

    });

//delete user
server
    .delete('/api/users/:id', (req, res) => {
        const { id } = req.params;

        users
            .remove(id)
            .then(user => {
                if (user[0]) {
                    return sendErrorMsg(404, `The name with ${id} does not exist`)
                } else {
                    res.status(200).json({ message: `User has been removed` })
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'The user could not be removed', res);
            });
    });

//update user

server
    .put('/api/users/:id', (req, res) => {
        const { id } = req.params;
        const changes = req.body;

        users
            .update(id, changes)
            .then(userId => {
                if (!req.body.name) {
                    return sendErrorMsg(400, 'Please provide a name to be posted')
                } else {
                    res.status(200).json(req.body)
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'The name could not be modified');
            });
    });

module.exports = server;