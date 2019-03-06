// import express framework
const express = require('express');

// create server & import routes

const server = express();
const routes = './data/routers/';
const users = require(`${routes}users`);
const posts = require(`${routes}posts`);
const tags = require(`${routes}tags`);

// establish parser and port
const port = 9090;
const parser = express.json();

// middleware importation
const logger = require('morgan'); // simple logging tool
const cors = require('cors'); // cross origin resource sharing middleware
const helmet = require('helmet'); // light-weight basic security middleware

// apply middleware
server.use(
    parser,
    logger('dev'),
    cors(),
    helmet(),
);

// define api routes
server.use('/api/users', users)
// server.use('/api/posts', posts)
// server.use('/api/tags', tags)

server.listen(port, () => {
    console.log(`Server started on port ${port}..`);
})