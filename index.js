const userRoutes = require('./users/userRoutes.js');

const express = require('express');

const server = express();

const logger = require('morgan');
const cors = require('cors');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

server.use(logger('combined'));
server.use(cors());
server.use(express.json());

server.use('/users', userRoutes);

server.post('/posts', (req, res) => {
    console.log(req.body);
    const { text, postedBy } = req.body;
    const newPost = { text, postedBy };
    postDb.insert(newPost)
    .then()
    .catch()

})

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});



const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));