const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const port = 8000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));