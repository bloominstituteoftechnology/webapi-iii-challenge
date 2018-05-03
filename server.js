const express = require('express');
const cors = require('cors');
const port = 5000;

const server = express();

const userDb = require('./data/helpers/userDb');

server.use(express.json());
server.use(cors());

server.use(express.json());
server.use(cors());

server.get('/api/users'),
  (req, res) => {
    userDb
      .get()
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send({ error: 'Error fetching users' }));
  };

server.listen(port, console.log(`\n== API Running on port ${port} ==\n`));
