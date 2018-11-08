const express = require('express')
const server = express();
server.use(express.json());
const userRoutes = require('../User/userRoute.js')

server.use('/', userRoutes)








module.exports = server;