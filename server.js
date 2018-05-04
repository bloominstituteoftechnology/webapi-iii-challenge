//imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = 5000;
const server = express();

const userRoutes = require('./RouteHandlers/userRoutes');
const postRouter = require('./RouteHandlers/postRouter.js');
const tagRouter = require('./RouteHandlers/tagRouter');

const tagToUpper = (req, res, next) => {
  console.dir(req.body);
}

//middleware
server.use(express.json());
// server.use(cors());

// routes
server.use('/api/users', userRoutes);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagToUpper, tagRouter);

server.listen(port, () => {
  console.dir(`server listening on port ${port}`);
})
