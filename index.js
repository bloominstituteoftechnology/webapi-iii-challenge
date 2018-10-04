const express = require('express');

const configureMiddleware = require('./config/middleware.js');
const userRoutes = require('./routes/userRoutes')

const postDB = require('./data/helpers/postDb');

const server = express();

const port = 7100;


configureMiddleware(server);

server.use('/api/users', userRoutes);

const logger = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} made to ${req.url}`);
  next();
};
server.use(logger, express.json());

const formatUserName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}; // middleware that takes the body's name and converts it to uppercase

server.get('/', (req, res) => {
  res.send('<h1><a href="https://github.com/michaelagard/Node-Blog" style="text-decoration:none; color:black"><code>Node-Blog Node.js Server</code></a></h1>');
}); // root server endpoint fluff

server.listen(port, () => {
  console.log(`### Node-Blog server started on ${port} ###`);
});