const cors = require('cors');
const express = require('express');




const port = 5454;
const server = express();
server.use(express.json());
server.use(cors());

// message at localhost:5454
const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// importing routes

const userRoutes = require('./users/userRoutes')
const tagRoutes = require('./tags/tagRoutes')
const postRoutes = require('./posts/postRoutes')

server.get('/', (req, res) => {
    res.send('Hello from express')

});

server.use('/users', userRoutes);
server.use('/tags', tagRoutes);
server.use('/posts', postRoutes);


server.listen(port, ()=> console.log(`Server running on port ${port}`));