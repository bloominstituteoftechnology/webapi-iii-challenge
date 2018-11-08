const express = require('express')
const server = express();
server.use(express.json());
const userRoutes = require('../User/userRoute.js')
const postRoutes = require('../Post/postRoutes.js')

server.use('/', userRoutes)
server.use('/posts', postRoutes)








module.exports = server;