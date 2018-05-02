const express = require('express');
const server = express();


server.listen(5000, () => console.log('\nServer listening on port 5000\n'));

server.get('/api/users', async (req, res) => {
  res.send('hello');
  // const users = await  
});

