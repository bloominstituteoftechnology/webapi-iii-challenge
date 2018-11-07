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
            res.json(user);
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


module.exports = server;