const express = require("express");
const helmet = require("helmet");

const server = express();

function greeter(name) {
  return (req, res, next) => {
    console.log(`hello ${name}`);

    next();
  };
}

function logger(msg) {
  return (req, res, next) => {
    console.log(`\n= ${msg}: ${req.url}`);

    next();
  };
}
server.use(greeter());
server.use(logger());
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("hello there!");
});
server.listen(3333, () => console.log("\n== API running on port 3333 ==\n"));
