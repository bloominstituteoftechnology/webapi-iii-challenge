const express = require("express");

//Routes
const userRoutes = require("./data/Routes/UserRoutes");
const postRoutes = require("./data/Routes/PostRoutes");
const tagRoutes = require("./data/Routes/TagRoutes");

//Built In Middleware
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

// Routing Middleware
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);
server.use("/api/tags", tagRoutes);

// Error Handling
server.use((req, res) => {
  res.status(404).send("This route does not exist.");
});

server.listen(8000, () => console.log("API running on port 8000"));
