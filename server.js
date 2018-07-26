const express = require('express');
const cors = require('cors');

const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use('/api', apiRoutes);

const sendUserError = (status, message, res) => {
  res.status(status).json({"errorMessage":message});
}

const conErr = (err) => { //Logs the compiler error to the console
  console.log("Console Error:", err);
}

server.use(express.json());
server.use(cors());

server.listen(8000, () => console.log('App is listening...'));
