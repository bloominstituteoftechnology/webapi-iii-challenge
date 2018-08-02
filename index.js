const express = require('express');

const server = express();

server.use('/', (req, res) => res.send('this works?'));

server.listen(8000, () => console.log('API running on port 8000'));