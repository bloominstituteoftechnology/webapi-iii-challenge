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
server.use((req,res,next) => {
  req.user = "JORDO";
  next();
})

server.use('api/posts/', postRoutes);
server.use('api/users/', userRoutes);

server.get('/', (req,res) => {
  res.send("HOME PAGE!!!");
})
server.listen(port, () => {
  console.log("Server has started!");
});