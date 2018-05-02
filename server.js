const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routers/userRoutes');
const postRoutes = require('./routers/postRoutes');
const tagRoutes = require('./routers/tagRoutes');

const server = express();

// Middlewares
function tagToUpperCase(req, res, next) {
    if(req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }

    next();
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(tagToUpperCase);

//  Route Handlers
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));