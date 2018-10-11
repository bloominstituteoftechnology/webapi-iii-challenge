console.log("Hello from  index.js!");

const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const db = require('./data/dbConfig');


const userRoutes = require('./users/userRoutes.js');
const postRoutes = require('./users/postRoutes.js');

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);


//Middleware

const timeStamp= (req, res, next) => {
    console.log(`${Date.now()} ${req.method} made to ${req.url}`)
    next();
}; //documentation timestamp to url with what method GET, PUT, etc

server.get('/', (req, res) => {
    res.send('Hello from your server!!!');
    });

const port = 9000;
server.listen(port, () => console.log(`API running crazy fire circles on this port ${port}`));

// const { name } = req.body;
    // const newUser = { name };
    // userDb.insert(newUser).then(userId => {
    //     const { id } = userId;
    //     userDb.post(id).then(user => {
    //         console.log(user);
    //         res.status(201).send(user);
    //     });