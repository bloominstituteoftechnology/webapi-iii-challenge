const express = require('express');

const postsRoutes = require('./postsRoutes/postsRoutes');
const usersRoutes = require('./usersRoutes/usersRoutes');

const server = express();
const parser = express.json();
const PORT = 3000;

server.use(parser);
server.use('/posts', postsRoutes)
server.use('/users', usersRoutes)



server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
})