// Import Node Modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const userRoutes = require('./users/userRoutes');
const tagRoutes = require('./tags/tagRoutes');
const postRoutes = require('./posts/postRoutes');

// Add Middleware
function thisUppercase(req, res, next) {
    if(req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }
    next();
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(thisUppercase);

server.use('/api/users', userRoutes);
server.use('/api/tags', tagRoutes);
server.use('/api/posts', postRoutes);

// Route Handlers
server.get('/', (req, res) => {
    res.send('API running');
});

const port = 5000;
server.listen(5000, () => console.log('\n== Server listening on port 5000 ==\n'));