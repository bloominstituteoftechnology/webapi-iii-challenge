const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(express.json());
server.use(cors());
server.use(helmet());

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

//USERS
server.use("/users", userRoutes);

//POSTS
server.use("/posts", postRoutes);

server.listen(9000, () => console.log("===API on port 9000==="));