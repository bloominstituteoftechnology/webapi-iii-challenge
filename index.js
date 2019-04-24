// Import Express
const express = require("express");

// Routes
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

// Initialize Express
const server = express();

// Middleware
server.use(express.json());

// Use Routes
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

// Run Server
server.listen(3000, () => {
  console.log("server running");
});
