const express = require('express');
// const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
// const userDb = require('./data/helpers/userDb');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./data/Routes/userRoute');
const postRoutes = require('./data/Routes/postRoute');
const tagRoutes = require('./data/Routes/tagRoute');



const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(uppercaseTag);


function uppercaseTag(req, res, next) {
    if (req.method === "GET" && req.url === '/tags') {
        let tags = res.json;
        res.json = function (data) {
            data.forEach(response => response.tag = response.tag.toUpperCase());
            tags.apply(res, arguments);
        }
    }
    next();
}





server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);























server.listen(9000, () => console.log("Api running here"));