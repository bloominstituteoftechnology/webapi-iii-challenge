const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 9000;

const userRoutes = require('./users/userRoutes.js')
const postRoutes = require('./posts/postRoutes.js')
const server = express();




server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("combined"));



//Routes
server.get('/', (req, res) => {
  res.send('<h1>Welcome to Posts</h1>')
})

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

server.listen(port, () =>
console.log(`\n=== API running on port ${port} ===\n`))

