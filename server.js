require('dotenv').config();
const express = require("express");
const userRoutes = require('./users/userRoutes')
const postRoutes = require('./posts/postRoutes')
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json(), logger("tiny"), helmet(), cors());

// Error handler

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};



server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)

server.listen(PORT, () => {
  console.log('\n*** Server Running on PORT ${PORT} ***\n');
});