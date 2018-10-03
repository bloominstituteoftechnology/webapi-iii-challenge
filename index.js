
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const port = 9000;
const helmet = require('helmet');

const server = express();



const greeter = (req, res, next) => {
  req.section = 'FSW-13';
  next();
};

const yell = (req, res, next) => {
  console.log(req.params)

  req.name = req.params.name.toUpperCase();

  next();
};

server.use(logger('tiny'), cors(), helmet());

server.get('/name/:name', yell, greeter, (req, res) => {
  res.send(`${req.name} is in ${req.section}`);
});

server.get('/section', greeter, (req, res) => {
  res.send(`Hello ${req.section}, I <3 U!`);
});


server.get('/', (req, res) => {
  res.send('Cowabunga!');
});

server.get('/rapha', (req, res) => {
  res.send('I am Raphael');
});

server.listen(port, () => {
  console.log(`Booyahkasha happening on ${port}`);
});
