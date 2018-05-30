const express = require('express'),
    server = express(),
    postDb = require('./data/helpers/postDb'),
    tagDb = require('./data/helpers/tagDb'),
    userDb = require('./data/helpers/userDb'),
    helmet = require('helmet'),
    cors = require('cors'),
    port = 5000;

server.use(express.json())
server.use(cors())
server.use(helmet())

server.listen(port, () => console.log(`== Server Running on Port ${port} ==`))