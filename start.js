// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');
const server = express();


// ROUTER SETUP
const userRoutes = require('./components/userRoutes');
const tagRoutes = require('./components/tagRoutes');
const postRoutes = require('./components/postRoutes');
server.use('/api/users', userRoutes);
server.use('/api/tags', tagRoutes);
server.use('/api/posts', postRoutes);


server.use(helmet()); // 3
server.use(express.json());

// GET SETUP
server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 3000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));