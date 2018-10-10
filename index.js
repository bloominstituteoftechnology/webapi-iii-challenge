console.log("Hello from  index.js!");

const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from your server!!!');
});

const port = 9000;
server.listen(port, () => console.log(`API running circles on port ${port}`));