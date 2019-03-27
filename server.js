const express = require('express');

const server = express();


//middleware


server.use(express.json());

server.get('/', (req, res, next) =>{
    res.send(`
    <h2>Projecto Workio</h2>
    `);
})

module.exports = server;