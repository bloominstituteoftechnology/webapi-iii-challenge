const express = require('express');

const db = require('./data/dbConfig');

const server = express();

server.listen(5000, console.log('\n== API Running on port 500 ==\n'));