const express = require('express'),
    server = express(),

    // db helpers
    postDb = require('./data/helpers/postDb'),
    tagDb = require('./data/helpers/tagDb'),
    userDb = require('./data/helpers/userDb'),

    // middleware
    helmet = require('helmet'),
    cors = require('cors'),
    port = 5000;

server.use(helmet())
server.use(cors())
server.use(express.json())





server.listen(port, () => console.log(`== Server Running on Port ${port} ==`))