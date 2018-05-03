const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// add middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// route handlers
server.get('/', (req, res) => {
    res.send('Api working');
});

const port = 5000;
server.listen(5000, () => console.log('\n== server listening on port 5000 ==\n'));