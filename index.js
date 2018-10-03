const express = require('express');
const server = express();
const port = 8000;

server.get('/', (req, res) => {
  res.send('Server test.');
});

server.listen(port, () => console.log('Server listening on port 8000.'));
