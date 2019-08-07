const express = 'express';

const server = require('express').Router();

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log(`you made a ${method} request to ${url} on [${new Date().toISOString()}]`);
  next();
}


module.exports = server;
