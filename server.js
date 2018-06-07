const express = require("express"),
    server = express(),
    cors = require("cors"),
    port = 5555;

const usersRouter = require('./data/routers/usersRoutes'),
      postsRouter = require('./data/routers/postsRoutes'),
      tagsRouter = require('./data/routers/tagsRoutes');
      

server.use(express.json());
server.use(cors());
server.use("/users", usersRouter);
server.use("/posts", postsRouter);
server.use("/tags", tagsRouter);

server.listen(port, () => console.log(`Server running on port ${port}`))
