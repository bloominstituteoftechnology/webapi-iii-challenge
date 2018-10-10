const express = require('express');
const server = express();
// const helmet = require('helmet');
// const cors = require('cors');
// const morgan = require('morgan');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

// server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
    res.send('Orange e30');
});

const port = 3400;
server.listen(port, () => console.log(`\n === Port ${port} === \n`));