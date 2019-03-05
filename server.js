// import express framework
const express = require('express');

// create server & import routes

const server = express();
const routes = './data/routers/';
const users = `${routes}users`;
const posts = `${routes}posts`;
const tags = `${routes}tags`;
console.log(tags) // check if routes are correct

// establish parser and port
const port = 9090;
const parser = express.json();

// middleware importation
const logger = require('morgan'); // simple logging tool
const cors = require('cors'); // cross origin resource sharing middleware
const helmet = require('helmet'); // light-weight basic security middleware

// apply middleware
server.use(
    // parser,
    // port,
    // logger('dev'),
    // cors(),
    // helmet(),
);