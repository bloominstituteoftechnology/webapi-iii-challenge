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

server.get('/users', (req, res) => {
    userDb.get()
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).json({ error: "The user info could not be found"}));
})

const port = 3400;
server.listen(port, () => console.log(`\n === Port ${port} === \n`));