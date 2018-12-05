const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');



const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    userDb.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500)
                .json({error: "The posts information could not be retrieved"})
        })
})

server.listen(4000);