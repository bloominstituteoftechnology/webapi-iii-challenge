const express = require('express');
const cors = require('cors');

//api route
const apiRoutes = require('./api/apiRoutes');

const server = express();
server.use(express.json());
server.use(cors({}));

server.use('/api', apiRoutes);

//error handler

function errorHandler(err, req, res, next){
  console.error(err);

  res.status(err.errorCode).json({ errorMessage: err.errorMessage });
}

server.use(errorHandler);


server.listen(9000, () => console.log('SERVER - PORT: 9000 - LISTENING'));
