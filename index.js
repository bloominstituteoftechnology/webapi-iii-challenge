const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./posts/postRoutes');

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// test the server
server.get('/', (req, res) => {
  res.send('Hello')
})

// route paths
server.use('/users', userRoutes);
server.use('/posts', postRoutes);




// SERVER @PORT 7K
server.listen(7000, () => console.log("Hello"));
