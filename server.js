// Node Modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Import from ./users/
const postsRouter = require("./data/posts/postsRouter");
const tagsRouter = require("./data/tags/tagsRouter");
const usersRouter = require('./data/users/usersRouter');

const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// Route Handlers
server.use('/api/users', usersRouter)
server.use('/api/tags', tagsRouter)
server.use('/api/posts', postsRouter)

// Server running
server.get("/", (req, res) => {
  res.send("API is running!");
});


server.listen(5000, () => console.log("\n== Server running on port 5000 ==\n"));
