const express = require('express');
const cors = require('cors');
// const helmet require('helmet');
const server = express();

const userDb = require('./data/helpers/userDb')

server.use(express.json())
server.use(cors())

server.use(express.json())
server.use(cors())
// server.use(helmet());

server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then((response) => res.status(200).send(response))
.catch(() => res.status(500).send({ error: 'Error fetching users' }))
});



  
server.listen(5000, console.log('Listening'))