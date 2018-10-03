const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const port = 9000;

const userDb = require("./data/helpers/userDb.js");

const server = express();

// MIDDLEWARES

const allCaps = (req, res, next) => {
  console.log(req.params);

  req.user = req.params.user.toUpperCase();

  next();
};

server.use(logger("tiny"), cors(), helmet());

// ROUTES
server.get("/user/:id", allCaps, (req, res) => {
  res.send(`${req.user}`);
});

server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err =>
      res.status(500).json({
        error: "The users information could not be retrieved."
      })
    );
});

// call server.listen w/ a port of your choosing
server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});
