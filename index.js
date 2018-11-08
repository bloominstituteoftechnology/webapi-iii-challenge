const express = require("express");
const port = 3334;
const server = express();

const bulkMiddleware  = require('./config/bulkMiddleware')
const usersRouter = require('./users/usersRouter')
const postsRouter = require('./posts/postsRouter')


bulkMiddleware(server)


server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)


server.listen(port, () => console.log(`we hear you ${port}`));
