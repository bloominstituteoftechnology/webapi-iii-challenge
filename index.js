const express = require('express');
const db = require('./data/dbConfig');
const server = express();
const PORT = 4000;
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const cors = require('cors')
const parser = express.json();
const logger = require('morgan');
const helmet = require('helmet');

server.use(cors())
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());


const sendUserError = (status, msg, res) => {
    res
    .status(status)
    .json({ Error: msg });
};

/********* Get Users *************/

server.get('/api/users', (req, res) => {
    users.get()
        .then((userDb) => {
            res.json(userDb);
        })
        .catch(err => {
            return sendUserError(500, 'Database Error', res);
        });
});


    server.listen(PORT, () => {
        console.log(`server is running on port ${PORT} `);
    });



