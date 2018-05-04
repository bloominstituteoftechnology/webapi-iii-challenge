//importing
const express = require('express');
const cors = require('cors');

//server run
const server = express();

//databases
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const tagRoutes = require('./tagRoutes');

// middleware
server.use(express.json());
server.use(cors());
//Routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

//get method initial
server.get('/', (req, res) => {
  res.send('Running now!');
})

//server attached to a port
const port = 5000;
server.listen(port, () => {
  console.log('== Server is listening on port 5000 ==')
});
