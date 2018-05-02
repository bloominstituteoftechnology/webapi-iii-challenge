// Node Modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Import from ./users/
const postRoutes = require("./posts/postRoutes");
const tagRoutes = require("./tags/tagRoutes");
const userRoutes = require('./users/userRoutes');

const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

// Route Handlers
server.use('/api/users', userRoutes)
server.use('/api/tags', tagRoutes)
server.use('/api/posts', postRoutes)

// Server running
server.get("/", (req, res) => {
  res.send("API is running!");
});


server.listen(5000, () => console.log("\n== Server running on port 5000 ==\n"));
