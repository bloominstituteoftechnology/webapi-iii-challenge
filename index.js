const express = require('express');
const path = require('path');
const server = express();

const postRoutes = require('./posts/postRoutes.js');
  //brings in post endpoints
const userRoutes = require('./users/userRoutes.js');
  //brings in user endpoint
const configMiddleware = require('./config/middleware.js');
  //brings in global middleware
configMiddleware(server);
  //enacts the middleware on the server

server.use('/users/', userRoutes)
server.use('/posts/', postRoutes)

server.get('/download', (req, res, next) => {
  console.log('download')
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath, err => {
    // if there is an error the callback function will get an error as it's first argument
    if (err) {
      // we could handle the error here or pass it down to error-handling middleware like so:
      next(err); // call the next error-handling middleware in the queue
    } else {
      console.log('File sent successfully');
    }
  });
});

server.use(errorHandler)

function errorHandler(err, req, res, next){
  console.log(err);
  res.status(500).json({message: "this is from the error handler, to demonstrate an error handling function"})
}

server.listen(5000, () => console.log('server running on 5k'))
