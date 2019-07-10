const express = require('express'); // importing a CommonJS modu

const postsRouter = require('./posts/posts-router.js');
const usersRouter = require('./users/users-router.js');
const gate = require('./auth/gate-middleware.js'); // <<<<<<<

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);

  next();
}

// setup global middleware
server.use(logger);
server.use(express.json());

server.get('/free', (req, res) => {
  res.status(200).json({ welcome: 'Web 20 Developers!' });
});

server.get('/paid', gate, (req, res) => {
  res.status(200).json({ welcome: 'To the mines of Moria' });
});

server.use('/api/posts', /*gate,*/ postsRouter);

server.use('/api/users', /*gate,*/ usersRouter);

function addName(req, res, next) {
  const name = 'Web 20 Developers';

  // add the name to the request
  req.teamName = name;

  next(); // press that button!!!
}

server.get('/', addName, (req, res) => {
  const nameInsert = req.teamName ? ` ${req.teamName}` : '';

  res.send(`
  <h2>Lambda Posts API</h2>
  <p>Welcome ${nameInsert} to the Lambda Posts API</p>
  `);
});

server.use(errorHandler);

function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(401).json({ you: 'Shall not pass!' });
}
// mw > mw > mw > eh > mw > mw > mw > eh > mw > mw > mw > eh

module.exports = server;
