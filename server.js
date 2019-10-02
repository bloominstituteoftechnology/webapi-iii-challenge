const express = 'express';

const server = express();
const userRouter = require ("./users/userRouter")
server.use(express.json())
server.use("/api/users", userRouter)
server.use(logger)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toLocaleTimeString()
  const date = new Date().toLocaleDateString()
  console.log(`${req.method} Request | http://localhost:8000${req.url} | ${date} , ${time}`)
  next()
};

module.exports = server;
