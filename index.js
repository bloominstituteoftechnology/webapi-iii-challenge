const express = require('express');

const configureMiddleware = require('./config/middleware.js');
const userRoutes = require('./routes/userRoutes.js')
const postRoutes = require('./routes/postRoutes.js')
const server = express();
const port = 7100;

configureMiddleware(server);

// function validate(req, res, next) {
//   const name = req.body.name;
//   if (name) {
//     next();
//   } else {
//     next('u12');
//   }
// }
// declares post/user endpoint routes for all userRoutes scenarios

server.use(express.json());
server.use('/api/posts', postRoutes);
server.use('/api/users', userRoutes);

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

server.use(logger)


server.get('/', logger, (req, res) => {
  res.send('<h1><a href="https://github.com/michaelagard/Node-Blog" style="text-decoration:none; color:black"><code>Node-Blog Node.js Server</code></a></h1>');
}); // root server endpoint fluff

server.listen(port, () => {
  console.log(`\n### Node-Blog server started on ${port} ###`);
});