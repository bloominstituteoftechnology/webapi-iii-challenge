const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./data/Routes/userRoutes');
const postRoutes = require('../Node-Blog/data/Routes/postRoutes');
const tagRoutes = require('./data/Routes/tagRoutes');

const server = express();


server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

const port = 8000;

server.listen(port, () => console.log(`\n== API RUNNING ON PORT ${port} ==\n`))