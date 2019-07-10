const express = require("express");
const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path} date: ${Date.now()}`);
  next();
}

module.exports = { logger };
