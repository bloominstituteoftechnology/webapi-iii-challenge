const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const parser = express.json();
const PORT = 4000;

//Endpoints


//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})