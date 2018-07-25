const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});













server.listen(8000, () => console.log("Api running here"));