const express = require('express');
const server = express();


server.get('/', (req, res) => {
  res.send('frank');
});

server.post('/', (req, res) => {
  res.send('sumi');
  console.log('I love cats');
})


server.listen(8080, () => console.log('Server running on port 8080'))
