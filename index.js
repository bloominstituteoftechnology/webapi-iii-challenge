const express = require("express");
const server = express();
const userRoutes = require("./users/userRoutes.js");

const configMiddleware = require("./config/middleware");

configMiddleware(server);

server.use("/api/users", userRoutes);

function uppercase(req, res, next) {
  req.body.name = req.body.name.charAt().toUpperCase() + req.body.name.slice(1);
  next();
}

server.get("/", (req, res) => {
  res.send("api running");
});

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
