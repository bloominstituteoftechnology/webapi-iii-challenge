//node modules
const express = require('express');
// const cors = require('cors');

//database helpers
const post = require('./data/helpers/postDB.js')
const tag = require('./data/helpers/tagDb.js')
const user = require('./data/helpers/userDb')


// database helpers
const port = 5555;
const server = express();
server.use(express.json())
// server.use(cors({ origin: 'http://localhost:3000' }))

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

server.listen(port, () => console.log(`Server running on port ${port}`));