const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('hello there!')
})
server.listen(3333, () => console.log("\n== API running on port 3333 ==\n"));
