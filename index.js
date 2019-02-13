// code away!
const express = require('express')
const postRouter = require('./Routes/postRoutes');
const userRouter = require('./Routes/userRoutes');
const server = express();

server.use(express.json());
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

// Home Route Running
server.get('/', (req, res) => {
    res.send('Hello from Node Blog')
});

  

server.listen(8000, () => console.log('API running on port 8000'));