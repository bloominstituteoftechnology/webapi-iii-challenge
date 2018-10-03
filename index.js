const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});

const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));