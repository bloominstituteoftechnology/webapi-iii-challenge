const express = require('express');
const PostRouter = require('./Post/postroutes.js');

const server = express();
server.use(express.json());
// server.use('/api/posts',  ) // this imports


server.listen(5000, () =>   console.log(`\n== API Running on port 5000 ==\n`));
