const express = require('express');

const userDB  = require('./users/userDb');
const postDB = require('./posts/postDb');
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();
const port = 5000;

server.use(express.json());
server.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );
  next();
});

server.get('/', (req,res) => {
  res.send("HOME PAGE!!!");
})
server.listen(port, () => {
  console.log("Server has started!");
});