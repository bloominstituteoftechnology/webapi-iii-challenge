const express = require("express");
const userRoutes = require('./users/userRoutes')
const postRoutes = require('./posts/postRoutes')
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const PORT = 9090;
const server = express();

server.use(express.json(), logger("tiny"), helmet(), cors());

// Error handler

const errorHelper = (status, message, res) => {
  res.status(status).json({ error: message });
};

// ===================== CUSTOM MIDDLEWARE =====================

const nameCheckMiddleware = (req, res, next) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({
      errorMessage: 'Please provide a name for the user.'
    });
  } else if (name.length > 128) {
    return res.status(400).json({
      errorMessage: 'Name too long. Use up to 128 characters.'
    });
  } else if (name[0] !== name[0].toUpperCase()) {
    return res.status(400).json({
      errorMessage: 'First letter of name must be uppercase.'
    });
  } else {
    next();
  }
};


server.use('/api/users', userRoutes)
server.use('/api/posts', postRoutes)

server.use('/', (req, res) => {
  res.json('API is running.')
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));