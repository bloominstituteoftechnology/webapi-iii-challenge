const express = require('express');
const userRoutes = require('./routes/userRoutes');

const server = express();
server.listen(5000, () => console.log('\nServer listening on port 5000\n'));
server.use(express.json());


server.use('/api/users', userRoutes);

const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
}

server.use(errorLog);
