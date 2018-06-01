const express = require('express');
const cors = require('cors');

// server code
const port = 5555;
const server = express();
server.use(express.json());
// server.use(cors({ origin: "http://localhost:3001" }));

// middleware
const clickWatchLogger = require('./data/middleware');

// import sub-applications
const usersRoutes = require('./users/usersRoutes');
// const tagsRoutes = require("./tags/tagsRoutes");
// const postsRoutes = require("./posts/postsRoutes");

// route handlers
server.use('/users', usersRoutes);
// server.use("/tags", tagsRoutes);
// server.use("/posts", postsRoutes);

server.use(clickWatchLogger);

server.listen(port, () => console.log(`Server is running on port ${port}`));

// const posts = require('./data/helpers/postDb.js');
// const tags = require('./data/helpers/tagDb.js');