const express = require('express');

const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();
const port = 5000;

server.use(express.json());
// logger
server.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
  );
  next();
});


server.use('/api/posts/', postRoutes);
server.use('/api/users/', userRoutes);

server.get('/', (req,res) => {
  res.send("HOME PAGE!!!");
})
server.listen(port, () => {
  console.log("Server has started!");
});