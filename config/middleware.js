const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(logger(`combined`));
  server.use(cors());
  server.use((req, res, next) => {
    if (req.body.name !== undefined) {
      req.body.name = req.body.name.toUpperCase();
      next();
    } else {
      next();
    }
  });
};
