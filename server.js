const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 5000;
const userRoutes = require('./RouteHandlers/userRoutes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', userRoutes);


server.listen(port, () => {
  console.dir(`server listening on port ${port}`);
})
