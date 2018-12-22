const express = require("express");
const userRoutes = require('./users/userRoutes')
const postRoutes = require('./posts/postRoutes')
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const PORT = 4001;
const server = express();

server.use(express.json(), logger("tiny"), helmet(), cors());

server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)

server.use('/', (req, res) => {
  res.json('Hello from express app running')
})

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
