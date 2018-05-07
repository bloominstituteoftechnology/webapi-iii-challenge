const express = require('express');

const server = express();

const postRoutes = require('./Routes/postRoutes');
const tagRoutes = require('./Routes/tagRoutes');
const userRoutes = require('./Routes/userRoutes');

server.use(express.json());
server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);
server.use('/users', userRoutes);
server.get('/', (req, res) => {
    res.send('Api is running!');
})

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'))