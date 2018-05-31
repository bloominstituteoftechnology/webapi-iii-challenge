const express = require('express');
const cors = require('cors');


const port = 5555;
const server = express();

server.use(express.json());
server.use(cors());

const usersRoutes = require('./users/usersRoutes');
const postsRoutes = require('./posts/postsRoutes');
const tagsRoutes = require('./tags/tagsRoutes');

server.listen(port, () => console.log(`Magic Happening on port${port}`));