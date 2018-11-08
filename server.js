const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// const capitalize = require('./middleware/capitalize');

const postDb = require('./data/helpers/postDb.js')
// const userDb = require('./data/helpers/userDb.js')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// function capitalize(req, res, next) {
//   let name = req.body.name;
//   name = name.split(" ").map(item => {
//     return item = item.substring(0,1).toUpperCase() + item.substring(1);
//   }).join(" ");
//   req.body.name = name;
//   next();
// }


const userRoute = require('./data/routes/userRoute');

const postRoute = require('./data/routes/postRoute')

const tagRoute = require('./data/routes/tagRoute');

server.use('/users', userRoute);
server.use('/posts', postRoute)
server.use('/tags', tagRoute), 

module.exports = server;
