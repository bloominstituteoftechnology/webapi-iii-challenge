
const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan');
const apiRoutes = require('./data/routers/apiRoutes')
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.route}`
    )
    next();
}

// function auth(req, res, next) {
//     if (req.url === '/posts') {
//         next();
//     } else {
//         res.send('You shall not pass!');
//     }
// }

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());
server.use('/api', apiRoutes);



server.listen(8000, () => console.log('API running on port 8000... *.*'));