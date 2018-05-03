const express = require('express');
const helmet = require('helmet');
const cors = require("cors");

const server = express();

const userRoutes= require('./users/usrRoutes');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) =>  {
    res.send('Testing Api');
});

server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));