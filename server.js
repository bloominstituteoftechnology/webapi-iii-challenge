const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send('Hello')
})

server.listen(8000, ( ) => console.log('\n == API on port 8000 =='))
