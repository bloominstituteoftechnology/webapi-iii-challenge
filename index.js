//pull in express
const express = require("express");
//pull in morgan
const logger = require("morgan");
//pull in cors
const cors = require("cors");
//set port number
const port = 7040;
const configureMiddleware = require("./data/middleware/middleware.js");

//GET USER ROUTES
const userRoutes = require("./data/users/userRoutes.js");
const postRoutes = require("./data/posts/posts.js");



//instantiate server
const server = express();

server.use("/posts", postRoutes);
server.use("/users", userRoutes);
/////////////////////MIDDLEWARES/////////////////////////////
configureMiddleware(server);
server.use(logger("tiny"), cors()); // Brock's Way
/////////////////////ROUTES/////////////////////////////////
server.get("/", (req, res) => {
  res.send(`Please work`);
});

//call a server.listen on port
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
