const userRoutes = require('./ServerRoutes/userRoutes');
const postRoutes = require('./ServerRoutes/postRoutes');
const tagRoutes = require('./ServerRoutes/tagRoutes');
const express = require('express');
const cors = require('cors');

//start server
const server = express();
//use middleware
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));
server.use(uppercaseTag);

//middleware to capitalize tags
function uppercaseTag(req, res, next) {
    if (req.method === 'GET' && req.url.includes('/tags')) {
        let tags = res.json;
        
        res.json = function (data) {
            // data(or argument[0]) contains the response body
            data.length > 1 
            ? data.forEach(tag => tag.tag = tag.tag.toUpperCase())
            : data.tag = data.tag.toUpperCase();
            tags.apply(res, arguments);
        }
    } 
    else if (req.method === 'GET' && req.url.match(/\/posts\/\d+/)) {
        let tags = res.json;

        res.json = function (data) {
            // data(or argument[0]) contains the response body
            data.tags = data.tags.map(tag => tag.toUpperCase())
            tags.apply(res, arguments);
        }
    }

    next();
}

server.use('/users', userRoutes);
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);

server.use((err, req, res, next) => {
    res.send(err);
})

server.listen(8000, () => console.log('\n=== API Running... ===\n'))