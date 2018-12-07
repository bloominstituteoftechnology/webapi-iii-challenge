const express = require('express');
const userRoute = require('./user.js');
const postRoute = require('./post.js');
const cors = require('cors');

const server = express();
const PORT = 9000;

// Muiddleware

server.use(cors());
server.use(express.json());
server.use((req, res, next) => {
    const name = req.body.name;
    if (name) {
        req.body.name = name.toUpperCase();
        next();
    } else {
        next();
    }
})

server.use('/users', userRoute);
server.use('/posts', postRoute);

// Endpoints



// Listen

server.listen(PORT, () => {
    console.log(`Server is alive and well at port ${PORT}`)
});