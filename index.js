// node modules
const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');
const cors = require('cors');

// init server
const server = express();
const port = 8000;
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('Server running...');
});

server.listen(port, () => console.log(`Server running @ localhost:${port}`));
