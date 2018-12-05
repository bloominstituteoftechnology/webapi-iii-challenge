const express = require('express');
 const userDb = require('./data/helpers/userDb');
 const server = express();
const port = 9000;
 server.get('/api/users', (req, res) => {
  res.send('hi')
})
 server.listen(port, () => console.log(`Listening to port ${port}`));