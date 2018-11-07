const express = require('express')
const server = express();
server.use(express.json())




server.get('/', (req, res) => {
    res.send('what up')
})








module.exports = server;