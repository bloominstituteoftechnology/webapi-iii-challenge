const express = require('express')

const server = express();

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')

const userRoutes = require('./userRoutes.js');
//const tagRoutes = require('./tagRoutes');
//const postRoutes = require('./postRoutes.js');


server.use(helmet);
server.use(morgan);
server.use(cors);
server.use(express.json());

server.use('/api/users', userRoutes);
// server.use(tagRoutes);
// server.use(postRoutes);

server.get('/', function(req,res) {
    res.json({ api: 'running...'})
})


server.listen(5000, console.log('API listening on port 5000'))