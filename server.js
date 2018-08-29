const express = require('express');
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');
const tabdb = require('./data/helpers/tagDb');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Sup fam')
})

server.listen(8000, () => console.log("\n== API on port 8k ==\n"))