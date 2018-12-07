const express = require('express');

const server = express();
const PORT = 4000;

server.get('/', (req, res) => {
    res.json({message: 'request recieved!'});

});

server.listen(PORT, err => {
    console.log(`Listening on port ${PORT}`);
});