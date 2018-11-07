const express = require('express');
const dbPost = require('./data/helpers/postDb.js')
const dbTag = require('./data/helpers/tagDb.js')
const dbUser = require('./data/helpers/userDb.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
   console.log('something');
});



const port = 9000;

server.listen(port, () => console.log(`\n API running on port ${port} \n`));

