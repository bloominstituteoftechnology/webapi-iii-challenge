// code away!
const express = require('express');

const server = express();
const PORT = 9090;

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.listen(PORT, () => {
    console.log(`server running on port number ${PORT}...`)
});
