// const postDb =require('./data/helpers/postDb.js');
// const tagDb = require('./data/helpers/tagDb.js');
// const userDb =require('./data/helpers/userDb.js');
const express = require('express');

//start server
const server= express();

//use middleware
server.use(express.json());

server.listen(8000, () => console.log('\n=== API Running... ===\n'))