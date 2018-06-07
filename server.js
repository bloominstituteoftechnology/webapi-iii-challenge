// import node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

// const userRoutes = require('./users/userRoutes');
// const tagRoutes = require('./users/tagRoutes');
// const postRoutes = require('./users/postRoutes');

// add middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/api/users', userRoutes);
// server.use('/api/tags', tagRoutes);
// server.use('/api/posts', postRoutes);

// route handlers
server.get('/', (req, res) => {
    res.send('API running');
});

const port = 5000;
server.listen(5000, () => console.log('\n== Server listening on port 5000 ==\n'));