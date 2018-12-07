
const express = require('express');
const helmet = require('helmet');
const custom = require('./custom-middleware.js');
const userRouter = require('./data/routers/userRouter.js');
const postRouter = require('./data/routers/postsRouter.js');
const server = express();
const parser = express.json();
const PORT = "4000";

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use(parser);
server.use(helmet());
server.use(custom.capUser);
server.use(custom.manNameLength);


server.get('/', (req, res)  =>  {
    res.json({ message: "Server Located!"});
})

server.listen(PORT, () =>  {
    console.log("server started. Kind of..");
})
