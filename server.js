const express = require('express');
const usersRoutes = require('./users/usersRoutes');
const db = require('./data/helpers/postDb.js');


const server = express();

server.use(express.json()); // parser
server.use('/api/users', usersRoutes);

// Endpoints
// /api/users/:id/posts

// TEST BELOW
// server.get('/', (req,res) => {
//     res.json({q:1});
// });

const port = 5000;

server.listen(port, () => {console.log("Server running on port 5000")});