// modules
const express = require('express');
const helmet = require ('helmet');
const morgan = require('morgan');

// server
const server = express();

// middlewares
server.use(express.json());


const port = 9000;
server.listen(port, () => console.log(`Party in port ${port}`))