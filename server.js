const express = require("express");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const tagRoutes = require("./routes/tagRoutes");

const server = express();
const CORS = require("cors");

server.use(express.json());
server.use(CORS());

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);
server.use("/api/tags", tagRoutes);

server.get("/", (req, res) => {
  res.send("The API is running!");
});

server.listen(5000, () => console.log("\nwe doin it my broseph\n"));
