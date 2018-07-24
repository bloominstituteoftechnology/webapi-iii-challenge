const express = require('express');

const server = express();
server.use(express.json());

const port = 4000;

server.listen(port, () => console.log(`Server is listening to port ${port}`));