const express = require('express');


const db =require('./data/dbConfig.js');
const server =express();
server.use(express.json());





const port =5000;
server.listen(port, () =>console.log('server running on port 5000'));