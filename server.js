const express = require('express');
const cors = require('cors');
const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());
server.use(cors());
server.use(logger);


server.get('/', (req, res) => {
  res.send(res.send({Success: "sanity check..."}));
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

//custom middleware

function logger(req, res, next) {
    let date = new Date;
    console.log(req.method)
    console.log(req.originalUrl)
    console.log(date.toLocaleTimeString());
    next()
};

server.listen(5555, () => {
    console.log(`Server listening on port 5555`);
})

