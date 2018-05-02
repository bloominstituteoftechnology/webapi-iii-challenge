const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routers/userRoutes.js');
const postRoutes = require('./routers/postRoutes.js');

const server = express();

// Middlewares
server.use(cors());
server.use(helmet());
server.use(express.json());

//  Route Handlers
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));