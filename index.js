const express = require('express');
const server = express();
const PORT = 6060;

server.use(express.json());

console.log('let us get started');

server.get('/', (req, res) => {
    res.send('hi there from inside an initial get function')
})


server.listen(PORT, () => {
  console.log(`server is alive on port ${PORT}`)
})