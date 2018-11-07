const express = require('express');
const users = require('../data/helpers/userDb');

const server = express();
server.use(express.json());

const sendErrorMsg = (errCode, msg, res) => {
    res.status(errCode);
    res.json({ Error: msg });
}

// custom middleware

const upperCase = (req, res, next) => {
    console.log(req.params)
    req.body.name = req.body.name.toUpperCase();

    next();
};

//update user

server
    .put('/api/users/:id', upperCase, (req, res) => {
        const { id } = req.params;
        const changes = req.body;

        users
            .update(id, changes)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} name was updated` })
                } else {
                    return sendErrorMsg(400, 'id not found')
                }
            })
            .catch(err => {
                return sendErrorMsg(500, 'The name could not be modified');
            });
    });





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
    .post('/api/users', upperCase, (req, res) => {
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
            .then(count => {
                res.status(200).json({ message: `${count} name has been removed` })

            })
            .catch(err => {
                return sendErrorMsg(500, 'The user could not be removed', res);
            });
    });


module.exports = server;