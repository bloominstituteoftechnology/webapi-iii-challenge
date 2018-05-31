const express = require('express');
const cors = require('cors');
const db = require('./data/dbConfig.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.listen(port, () => console.log(`Server is running on port ${port}`));