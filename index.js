const express = require('express');
const db = require('./data/dbConfig');
// const cors = require('cors');
const server = express();


server.use(express.json());

server.get('/', (req, res) => {
    res.json('alive');
})



server.get('/')

const port = 9000;
server.listen(port, () => console.log('API running'));
