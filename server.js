const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./data/routes/userRoute');
const postRoute = require('./data/routes/postRoute');
const tagRoute = require('./data/routes/tagRoute');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


// //Middleware
// function uppercaseTag(req, res, next) {
//     if (req.method === 'GET' && req.url === '/tags') {
//         let tags = res.json;
//         res.json = function (data) {
//             data.forEach(response=> response.tag = response.tag.toUpperCase());
//             tags.apply(res, arguments);
//         }
//     }
//     next();
// }

// server.use(uppercaseTag)


server.use('/users', userRoute);
server.use('/posts', postRoute);
server.use('/tags', tagRoute);

server.listen(8000, () => console.log("Yo, your API is running on port 8000"));