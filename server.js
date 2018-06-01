const express = require('express');
const cors = require('cors');
const port = 5555;
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// sub-applications
const usersRoutes = require('./users/usersRoutes');
// const postsRoutes = require('./posts/postsRoutes');
// const tagsRoutes = require('./tags/tagsRoutes');

// route handlers
server.use('/users', usersRoutes);
// server.use('/api/tags', tagsRoutes);
// server.use('/api/posts', postsRoutes);



server.listen(port, () => console.log(`Magic Happening on port ${port}`));