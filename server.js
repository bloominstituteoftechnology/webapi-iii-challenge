const express = require("express");
const helmet = require("helmet");
const server = express();
const cors = require('cors');

const routeUser = require('./users/userRoute');
const routeTag = require('./users/tagRoute');
const routePost = require('./users/postRoute');

function thisUppercase(req, res, next) {
    if(req.body.tag) {
        req.body.tag = req.body.tag.toUpperCase();
    }
    next();
}



server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(thisUppercase);


server.use('/api/users', routeUser);
server.use('/api/posts', routePost);
server.use('/api/tags', routeTag);

server.get('/', (req, res) => {
    res.send('Api working');
});

server.listen(5000, () => {
    console.log('server listening on port 5000');
  });