const express = require('express');
const cors = requite('cors');



const server = express();


server.use(express.json());
server.use(cors());

const userRoutes = require('./users/userRoutes');
const postRoutes = require('./users/postRoutes');
const tagRoutes = require('./users/tagRoutes');

