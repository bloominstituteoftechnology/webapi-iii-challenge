const express = require('express');
const morgan = require('morgan');

const user = require('./routes/user');

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
  const name = req.body.name;

  if (name) {
      const capitalizedString = name.toUpperCase();
      req.body.name = capitalizedString;
  } 
  next();
});

server.use('/users', user);


server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});