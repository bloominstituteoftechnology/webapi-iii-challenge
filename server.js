const express = require('express')

const server = express();

const helmet = require('helmet');
const cors = require('cors')

const userRoutes = require('./userRoutes.js');
// const tagRoutes = require('./tagRoutes');
// const postRoutes = require('./postRoutes.js');

//custom middle ware
function logger(req, res, next) {
    console.log( 'epic response here');

    next();
}
//use middle ware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRoutes);
// server.use(tagRoutes);
// server.use(postRoutes);

// initial route
server.get('/', function(req,res) {
    res.json({ api: 'running...'})
})



server.listen(5000, console.log('API listening on port 5000'));