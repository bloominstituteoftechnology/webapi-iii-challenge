const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const userDB = require('./data/helpers/userDB.js');
const postDB = require('./data/helpers/postDB.js');
const tagDB = require('./data/helpers/tagDB.js');

const port = 7000;

//initiating server
const server = express();

//MIDDLEWARES
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger('combined'));

//ROUTES - GET Enpoint
server.get('/', (req, res) => {
    res.send('Cowabunga!');
  });


//LISTENER
server.listen(port, () => {
    console.log(`=== API LISTENING ON PORT ${port} ===`);
});
