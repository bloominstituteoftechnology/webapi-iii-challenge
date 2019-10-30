const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./users/userRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use(cors());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
      function logger(req, res, next) {
        console.log(
          `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            "Origin"
          )}`
        );
      
        next();
      }

//custom middleware

// function logger(req, res, next) {}

module.exports = server;
