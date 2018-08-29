const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('API up and running!'));

// using port 9000 for this example
server.listen(9000, () => console.log('API running on port 9000'));