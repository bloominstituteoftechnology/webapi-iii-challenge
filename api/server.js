const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("short"));

server.get('/', (req, res) => {
    res.send(`Sanity check success 2`);
})



module.exports = server;